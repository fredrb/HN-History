const request = require('request-promise')
const ut = require('unix-timestamp')

const TOPIC_PREFIX = 'https://news.ycombinator.com/item?id='

/**
 * Based on Algolia API (hn.algolia.com/api)
 * @class HackerNewsSource
 * @ping  [ping]
 * @entry [fetchByYear]
 * @input [topic] [year]
 * @returns {
 *  total (Number): Total number of hits
 *  request (String): Request triggered to original API
 *  year (Number): Year passed as parameter
 *  items (Array): {
 *    created_at (Date): Creation Date
 *    title (String): Item title
 *    url (String): Posted Link (URL)
 *    author (String): Author username
 *    points (Number): Upvotes
 *    num_comments (Number): Comments count
 *    discussion (String): Link to HN discussion (URL)
 *  }
 * }
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
    const url = this._makeURL(topic, year)
    const results = await this._request(url)
    const items = results.hits.map(this._mapItems)
    return {
      items,
      year,
      total: results.nbHits,
      request: url
    }
  }

  _mapItems (r) {
    return {
      created_at: r.created_at,
      title: r.title,
      url: r.url,
      author: r.author,
      points: r.points,
      num_comments: r.num_comments,
      discussion: `${TOPIC_PREFIX}${r.objectID}`
    }
  }

  _makeURL (topic, year) {
    year = parseInt(year)
    const from = ut.fromDate(`${year}-01-01`)
    const to = ut.fromDate(`${year + 1}-01-01`)
    return `https://hn.algolia.com/api/v1/search?query=${topic}&numericFilters=["created_at_i>=${from}","created_at_i<${to}"]&tags=["story"]`
  }

  async _request (url) {
    const payload = await request.get(url)
    return JSON.parse(payload)
  }
}

module.exports = HackerNewsSource
