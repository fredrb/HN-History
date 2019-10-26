require('mocha')

const chai = require('chai')
const sinon = require('sinon')

const expect = chai.expect

const request = require('request-promise')

const PING_EXAMPLE = {
  id: 1,
  username: 'pg',
  objectID: 'pg'
}

const SEARCH_EXAMPLE = {
  hits: [
    {
      created_at: '2019-09-23T07:00:38.000Z',
      title: 'Serverless: slower and more expensive',
      url: 'http://einaregilsson.com/serverless-15-percent-slower-and-eight-times-more-expensive/',
      author: 'kiyanwang',
      points: 1787,
      story_text: null,
      comment_text: null,
      num_comments: 712,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1569222038,
      objectID: '21046547'
    },
    {
      created_at: '2019-02-04T21:36:48.000Z',
      title: '“Lambda and serverless is one of the worst forms of proprietary lock-in” (2017)',
      url: 'https://www.theregister.co.uk/2017/11/06/coreos_kubernetes_v_world/',
      author: 'peter_d_sherman',
      points: 746,
      story_text: null,
      comment_text: null,
      num_comments: 394,
      story_id: null,
      story_title: null,
      story_url: null,
      parent_id: null,
      created_at_i: 1549316208,
      objectID: '19080875'
    }
  ]
}

const jan2018 = 1514764800
const jan2019 = 1546300800
const jan2020 = 1577836800

const HackerNewsSource = require('../../../src/sources/hacker-news')

context('#hacker-news source', () => {
  let mock, source
  beforeEach(() => {
    source = new HackerNewsSource()
    sinon.restore()
    mock = sinon.mock(request)
  })

  const givenURL = (topic, from, to) => {
    return `https://hn.algolia.com/api/v1/search?query=${topic}&numericFilters=["created_at_i>=${from}","created_at_i<${to}"]`
  }

  const mockResolve = (url, result) => {
    mock.expects('get').withArgs(url)
      .resolves(JSON.stringify(result))
  }

  describe('@fetchByYear', () => {
    it('should call @fetchByYear', async () => {
      mockResolve(givenURL('example', jan2019, jan2020),
        SEARCH_EXAMPLE)
      await source.fetchByYear('example', 2019)
    })

    it('should pass [example] and [2019] to @fetchByYear', async () => {
      mockResolve(givenURL('example', jan2019, jan2020),
        SEARCH_EXAMPLE)
      await source.fetchByYear('example', 2019)
      mock.verify()
    })

    it('should pass [example] and [2018] to @fetchByYear', async () => {
      mockResolve(givenURL('example', jan2018, jan2019),
        SEARCH_EXAMPLE)
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
      mockResolve(givenURL('example', jan2019, jan2020),
        SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.length).to.be.greaterThan(1)
      properties.forEach(p => expect(result[0]).to.have.property(p))
    })

    it('should not return objectID in properties of response', async () => {
      mockResolve(givenURL('example', jan2019, jan2020),
        SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.length).to.be.greaterThan(1)
      expect(result[0]).not.to.have.property('objectID')
    })

    it('should have discussion property', async () => {
      mockResolve(givenURL('example', jan2019, jan2020),
        SEARCH_EXAMPLE)
      const result = await source.fetchByYear('example', 2019)
      expect(result.length).to.be.greaterThan(1)
      expect(result[0]).to.have.property('discussion')
      expect(result[0].discussion).to.be.equal('https://news.ycombinator.com/item?id=21046547')
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
      mockResolve(PING_EXAMPLE)
      return source.ping()
    })

    it('should send a GET request to [hn.algolia.com/api/v1/users/pg]', async () => {
      mockResolve(PING_EXAMPLE)
      source.ping()
      return mock.verify()
    })

    it('should return true when ping is successulf', async () => {
      mockResolve(PING_EXAMPLE)
      return expect(await source.ping()).to.be.true
    })

    it('should return false when ping is not successful', async () => {
      mockReject({ message: 'some error' })
      return expect(await source.ping()).to.be.false
    })
  })
})
