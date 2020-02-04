const supertest = require('supertest');
const server = require('../api/server.js');
const request = supertest(server)
let token;




    beforeAll((done) => {
      request
        .post('/api/auth/login')
        .send({
          username: 'BaronHarkonnen',
          password: 'test',
        })
        .end((err, response) => {
          token = response.body.token; 
          console.log(token)
          done();
        });
    });          
    describe('test fetch favorites', () => {
      test('It should require authorization', () => {
        return request
          .get('/api/user/dashboard/1')
          .then((response) => {
            expect(response.statusCode).toBe(401);
          });
      });
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