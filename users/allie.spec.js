const Users = require('./users-model');
const db = require('../database/dbConfig');
const supertest = require('supertest');
const server = require('../api/server');
const request = supertest(server);


// This test works! You might have to change the username to something unique in the 
// status 201 test to see it work properly.

describe('test register', function () {
    it('shows status 201', async function (done) {
        request
            .post('/api/auth/register')
            .send({ username: 'chance1', password: '111111' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                done();
              });
    });

    it('shows status 500', async function (done) {
        request
            .post('/api/auth/register')
            .send({ username: 'chance', password: '211111' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
              });
    })  
});  


// This test works! It will work every time, no need to change anything. 

describe('test login', function () {
    it('shows status 200', async function (done) {
        request
            .post('/api/auth/login')
            .send({ username: 'allie', password: '222222' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                done();
              });
    });

    it('shows status 401', async function (done) {
        request
            .post('/api/auth/login')
            .send({ username: 'allie', password: '522222' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                done();
              });
    })  

    it('shows status 500', async function (done) {
        request
            .post('/api/auth/login')
            .send({ name: 'chance', password: '111111' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500)
            .end(function(err, res) {
                if (err) return done(err);
                done();
              });
    })  
});   


let token;

    beforeAll((done) => {
      request
        .post('/api/auth/login')
        .send({
          username: 'allie',
          password: '222222',
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          console.log(token)
          done();
        });
    });          

    describe('GET /', () => {
      // token not being sent - should respond with a 401
      test('It should require authorization', () => {
        return request
          .get('/api/user/dashboard/1')
          .then((response) => {
            expect(response.statusCode).toBe(401);
          });
      });
      // send the token - should respond with a 200
      test('It responds with JSON', () => {
        return request
          .get('/api/user/dashboard/1')
          .set('Authorization', `${token}`)
          .then((response) => {
            expect(response.statusCode).toBe(200);
            expect(response.type).toBe('application/json');
          });
      });  
    });
