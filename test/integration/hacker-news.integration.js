const request = require('request-promise')
const chai = require('chai')
chai.use(require('chai-as-promised'))

const expect = chai.expect

describe('=== TEST /v1/source/hacker-news API ===', () => {
  const testCase = async (topic, year) => {
    const result = await request.get(`http://localhost:8080/api/v1/source/hacker-news/${topic}/${year}`)
    const json = JSON.parse(result)
    expect(json).to.have.property('results')
    expect(json.results).to.have.property('total')
    expect(json.results).to.have.property('items')
    json.results.items.forEach(i => {
      const date = new Date(i.created_at)
      expect(date.getUTCFullYear()).to.be.equal(year)
    })
  }

  it('should be running on localhost', () => {
    const promise = request.get('http://localhost:8080/api/v1')
    return expect(promise).to.eventually.be.fulfilled
  })

  it('@2019', async () => testCase('Serverless', 2019))
  it('@2018', async () => testCase('Serverless', 2018))
  it('@2017', async () => testCase('Serverless', 2017))
})
