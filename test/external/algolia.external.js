const chai = require('chai')
const expect = chai.expect
const request = require('request-promise')

const ALGOLIA_PROPERTIES = [
  'created_at',
  'title',
  'url',
  'author',
  'points',
  'num_comments',
  'objectID'
]

context('Algolia API Test', () => {
  it('Should get proper payload response', async () => {
    const payload = await request.get('https://hn.algolia.com/api/v1/search?query=Serverless&numericFilters=[%22created_at_i%3E=1546300800%22,%22created_at_i%3C1577836800%22]')
    const results = JSON.parse(payload)

    expect(results).to.have.property('hits')
    expect(results.hits.length).to.be.greaterThan(1)
    ALGOLIA_PROPERTIES.forEach(p => expect(results.hits[0], `Missing property ${p}`).to.have.property(p))
  })
})
