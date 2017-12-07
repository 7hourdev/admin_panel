const exec = require('mz/child_process').exec;
const request = require('supertest');
const expect = require('chai').expect;

const app = require('../api/server.js');

describe('express serving', function () {

  it('responds to bundle.js request', function () {
    request(app)
      .get('/bundle.js')
      .expect('Content-Type', 'application/octet-stream')
      .expect(200)
      .then(()=>{done()});
  });

  it('responds to any api route invalid (not authorized)', function () {
    request(app)
      .get('/data/user/me')
      .expect('Content-Type', /json/)
      .expect(404) // You should not be authorized
      .then(()=>{done()})
  });
});