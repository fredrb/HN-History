const _ = require("underscore");
const ut = require("unix-timestamp");
const request = require("request-promise");
const fs = require('fs');

const ALGOLIA_API = "http://hn.algolia.com/api";
const ALGOLIA_VERSION= "v1";

const MINIMUM_POINTS = 150;
const TIME_WINDOW = 'monthly'; // Yearly, Semester, Quartertly, Monthly

let results = []

const getUnixDate = (month, year) => {
  if (month > 12) {
    month = 1;
    year += 1;
  }
  return ut.fromDate(`${year}-${month}-01`);
}

const WINDOWS = {
  monthly: (year) => {
    return {
      year,
      data: _.range(1, 13).map((month) => `["created_at_i>=${getUnixDate(month, year)}","created_at_i<${getUnixDate(month+1, year)}"]`)
    }
  }
}

const mapToURL = (query, numericFilters) => {
  return `${ALGOLIA_API}/${ALGOLIA_VERSION}/search?query=${query}&numericFilters=${numericFilters}`;
}

const sliceCreatedAtParams = (year) => {
  return WINDOWS[TIME_WINDOW](year);
}

const getHistoricalPosts = async (queryString, fromYear) => {
  // Get every post from all TIME_WINDOWs since fromYear until today using query string
  // Filter posts wiht MINIMUM_POINTS and select only the top ones
  const currentYear = new Date().getUTCFullYear();
  let results = [];
  const promises = _.range(fromYear, currentYear+1)
    .map(sliceCreatedAtParams)
    .map((yearSlice) => {
      return {
        year: yearSlice.year,
        data: yearSlice.data.map((slice) => mapToURL(queryString, slice))
      }
    })
    .map((years) => {
      console.log(`Triggering requests for year ${years.year}`);
      return Promise.all(years.data.map(url => request.get(url))).then((data) => {
        results = results.concat(data);
      })
    });
  Promise.all(promises).then(() => {
    let filteredResults = [];
    results.forEach((r) => {
      const hits = JSON.parse(r)["hits"];
      if (hits.length > 0) {
        const mvh = hits.filter(hits => hits.points > MINIMUM_POINTS);
        filteredResults = filteredResults.concat(_.sortBy(mvh, (hits => hits.points)).slice(0,3).map((v) => {
          return {
            created_at: v.created_at,
            title: v.title,
            url: v.url,
            points: v.points,
            discussion: `https://news.ycombinator.com/item?id=${v.objectID}`,
          }
        }))
      }
    })
    fs.writeFile(`./filtered-result-${new Date().toISOString()}`, JSON.stringify(filteredResults), () => console.log('Done'));
  })
}

getHistoricalPosts("Serverless", 2015);
