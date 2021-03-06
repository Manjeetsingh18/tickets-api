import * as supertest from 'supertest'
import * as assert from 'assert'
import app from '../App'
import db from '../configurations/db.config'

describe('App', () => {
  it('ping http', (done) => {
    supertest(app)
      .get('/')
      .expect('Content-Type', /text\/plain/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        else if (res.text !== 'OK') return done('Error in server response')
        else done()
      })
  })

  it('connect mongodb', (done) => {
    db.connectMongo(done)
  }).timeout(4000)
})
