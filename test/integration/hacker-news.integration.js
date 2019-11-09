const request = require('request-promise')
const chai = require('chai')
chai.use(require('chai-as-promised'))

const expect = chai.expect

describe('Service Test', () => {
  it('should be running on localhost', () => {
    const promise = request.get('http://localhost:8080/api/v1')
    return expect(promise).to.eventually.be.fulfilled
  })

  const yearAssertion = (item, year) => {
    const date = new Date(item.created_at)
    expect(date.getUTCFullYear()).to.be.equal(year)
    return expect(item.points).not.to.be.undefined
  }

  describe('=== TEST /v1/source/hacker-news API ===', () => {
    const testCase = async (topic, year) => {
      const result = await request.get(`http://localhost:8080/api/v1/source/hacker-news/${topic}/${year}`)
      const json = JSON.parse(result)
      expect(json).to.have.property('results')
      expect(json.results).to.have.property('total')
      expect(json.results).to.have.property('items')
      json.results.items.forEach(i => yearAssertion(i, year))
    }

    it('@2019', async () => testCase('Serverless', 2019))
    it('@2018', async () => testCase('Serverless', 2018))
    it('@2017', async () => testCase('Serverless', 2017))
  })

  describe('=== TEST /v1/source/hacker-news/:k/:from/:to API ===', () => {
    const testCase = async (topic, from, to) => {
      const result = await request.get(`http://localhost:8080/api/v1/source/hacker-news/${topic}/${from}/${to}`)
      const json = JSON.parse(result)
      expect(json).to.have.property('results')
      for (let year = parseInt(from); year <= parseInt(to); year++) {
        expect(json.results).to.have.property(year)
        expect(json.results[year]).to.have.property('total')
        expect(json.results[year]).to.have.property('items')
        json.results[year].items.forEach(i => yearAssertion(i, year))
      }
    }

    it('@2017 - @2019', async () => testCase('Serverless', 2017, 2019))
    it('@2008 - @2011', async () => testCase('Serverless', 2008, 2011))
  })
})
