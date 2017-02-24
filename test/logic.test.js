const chai = require('chai')
const expect = require('chai').expect
const logic = require('../server/controllers/logic')
const chaiHTTP = require('chai-http')
const url = 'http://localhost:3000'
chai.use(chaiHTTP)

describe('Check App logic', function () {
  it('expect to return object when connected', function () {
    expect(logic).to.be.a('object')
  })
  it('expect to get number from train', function () {
    expect(logic.train().awesomeness).to.be.a('number')
  })
  it('expect logic.train to have hunger fatigue thirst awesomeness property', function () {
    expect(logic.train()).to.have.property('hunger')
    expect(logic.train()).to.have.property('thirst')
    expect(logic.train()).to.have.property('fatigue')
    expect(logic.train()).to.have.property('awesomeness')
  })
  it('expect to get number from eat', function () {
    expect(logic.eat().hunger).to.be.a('number')
  })
  it('expect logic.eat to have hunger thirst property', function () {
    expect(logic.eat()).to.have.property('hunger')
    expect(logic.eat()).to.have.property('thirst')
  })
  it('expect to get number from sleep', function () {
    expect(logic.sleep().fatigue).to.be.a('number')
  })
  it('expect logic.sleep to have hunger thirst fatigue property', function () {
    expect(logic.sleep()).to.have.property('hunger')
    expect(logic.sleep()).to.have.property('thirst')
    expect(logic.sleep()).to.have.property('fatigue')
  })
  it('expect to get number from drink', function () {
    expect(logic.drink().thirst).to.be.a('number')
  })
  it('expect logic.drink to have thirst property', function () {
    expect(logic.drink()).to.have.property('thirst')
  })
  it('expect to get number from rest', function () {
    expect(logic.rest().fatigue).to.be.a('number')
  })
  it('expect logic.rest to have thirst property', function () {
    expect(logic.rest()).to.have.property('fatigue')
  })
})

let userid
function success (status) {
  let isSuccess = status >= 200 && status < 300 || status === 304
  if (isSuccess) return status
  else return '500 or 404'
}

describe('Check App logic modify database', function () {
  it('expect training to be a function', function () {
    expect(logic.training).to.be.a('function')
  })
  it('should return 200 <= status < 300 || status === 304 and an object', function (done) {
    chai.request(url)
      .post('/api/users/register')
      .send({
        name: 'Syanmil',
        hunger: 100,
        thirst: 100,
        fatigue: 100,
        awesomeness: 0
      })
      .end(function (err, res) {
        userid = res.body._id
        res.body.name.should.equal('Syanmil')

        res.should.have.status(success(res.status))
        res.body.should.be.an('object')
        done()
      })
  })
  it('expect training to be change all status', function (done) {
    chai.request(url)
      .get(`/api/users/${userid}/train`)
      .end(function (err, res) {
        expect(res.body.hunger).to.be.equal(98)
        expect(res.body.awesomeness).to.be.equal(2)
        expect(res.body.thirst).to.be.equal(98)
        expect(res.body.fatigue).to.be.equal(98)
        done()
      })
  })
  it('expect eating to fill full', function (done) {
    chai.request(url)
      .get(`/api/users/${userid}/eat`)
      .end(function (err, res) {
        expect(res.body.hunger).to.be.equal(100)
        expect(res.body.thirst).to.be.equal(97)
        done()
      })
  })
  it('expect drinking to be change fill thirst', function (done) {
    chai.request(url)
      .get(`/api/users/${userid}/drink`)
      .end(function (err, res) {
        expect(res.body.thirst).to.be.equal(100)
        done()
      })
  })
  it('expect sleeping to relive fatigue', function (done) {
    chai.request(url)
      .get(`/api/users/${userid}/sleep`)
      .end(function (err, res) {
        expect(res.body.hunger).to.be.equal(90)
        expect(res.body.thirst).to.be.equal(90)
        expect(res.body.fatigue).to.be.equal(100)
        done()
      })
  })

  it('should return 200 <= status < 300 || status === 304', function (done) {
    chai.request(url)
      .delete(`/api/users/delete/${userid}`)
      .end(function (err, res) {
        res.should.have.status(success(res.status))
        done()
      })
  })
})
