const request = require('request-promise')
const ut = require('unix-timestamp')

/**
 * Based on Algolia API (hn.algolia.com/api)
 * @class HackerNewsSource
 */
class HackerNewsSource {
  async ping () {
    try {
      await request.get('https://hn.algolia.com/api/v1/users/pg')
      return true
    } catch (error) {
      return false
    }
  }

  async fetchByYear (topic, year) {
    year = parseInt(year)
    const from = ut.fromDate(`${year}-01-01`)
    const to = ut.fromDate(`${year + 1}-01-01`)
    const url = `https://hn.algolia.com/api/v1/search?query=${topic}&numericFilters=["created_at_i>=${from}","created_at_i<${to}"]`
    const payload = await request.get(url)
    const results = JSON.parse(payload)

    const items = results.hits.map(r => {
      return {
        created_at: r.created_at,
        title: r.title,
        url: r.url,
        author: r.author,
        points: r.points,
        num_comments: r.num_comments,
        discussion: `https://news.ycombinator.com/item?id=${r.objectID}`
      }
    })

    return {
      items,
      total: results.nbHits,
      request: url
    }
  }
}

module.exports = HackerNewsSource
