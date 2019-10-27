require('mocha')

const expect = require('chai').expect
const sinon = require('sinon')
const request = require('request-promise')

const CONSTANTS = require('./constants')

const HackerNewsSource = require('../../../src/sources/hacker-news')

context('#hacker-news source', () => {
  let mock, source
  beforeEach(() => {
    source = new HackerNewsSource()
    sinon.restore()
    mock = sinon.mock(request)
  })

  describe('@fetchByYear', () => {
    const mockResolve = (url, result) => {
      mock.expects('get').withArgs(url)
        .resolves(JSON.stringify(result))
    }

    const givenURL = (topic, from, to) => {
      return `https://hn.algolia.com/api/v1/search?query=${topic}&numericFilters=["created_at_i>=${from}","created_at_i<${to}"]`
    }

    it('should call @fetchByYear', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      await source.fetchByYear('example', 2019)
    })

    it('should pass [example] and [2019] to @fetchByYear', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      await source.fetchByYear('example', 2019)
      mock.verify()
    })

    it('should pass [example] and [2018] to @fetchByYear', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2018, CONSTANTS.jan2019),
        CONSTANTS.SEARCH_EXAMPLE)
      await source.fetchByYear('example', 2018)
    })

    it('should return response with properties [created_at, title, url, points, num_comments, autor]', async () => {
      const properties = [
        'created_at',
        'title',
        'url',
        'author',
        'points',
        'num_comments'
      ]
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.items.length).to.be.greaterThan(1)
      properties.forEach(p => expect(result.items[0]).to.have.property(p))
    })

    it('should not return objectID in properties of response', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.items.length).to.be.greaterThan(1)
      expect(result.items[0]).not.to.have.property('objectID')
    })

    it('should have discussion property', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.items.length).to.be.greaterThan(1)
      expect(result.items[0]).to.have.property('discussion')
      expect(result.items[0].discussion).to.be.equal('https://news.ycombinator.com/item?id=21046547')
    })

    it('should return number of items in result object', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.total).to.be.equal(2)
    })

    it('should return maximum of 5 items in the result object', async () => {
      mockResolve(givenURL('example', CONSTANTS.jan2019, CONSTANTS.jan2020),
        CONSTANTS.LARGE_RESULT_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.items.length).to.be.equal(5)
    })
  })

  describe('@ping', () => {
    const mockResolve = (result) => {
      mock.expects('get').withArgs('https://hn.algolia.com/api/v1/users/pg')
        .resolves(JSON.stringify(result))
    }

    const mockReject = (error) => {
      mock.expects('get').withArgs('https://hn.algolia.com/api/v1/users/pg')
        .rejects(JSON.stringify(error))
    }

    it('should call @ping', async () => {
      mockResolve(CONSTANTS.PING_EXAMPLE)
      return source.ping()
    })

    it('should send a GET request to [hn.algolia.com/api/v1/users/pg]', async () => {
      mockResolve(CONSTANTS.PING_EXAMPLE)
      source.ping()
      return mock.verify()
    })

    it('should return true when ping is successulf', async () => {
      mockResolve(CONSTANTS.PING_EXAMPLE)
      return expect(await source.ping()).to.be.true
    })

    it('should return false when ping is not successful', async () => {
      mockReject({ message: 'some error' })
      return expect(await source.ping()).to.be.false
    })
  })
})
