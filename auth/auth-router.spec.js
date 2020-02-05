const supertest = require('supertest');
const server = require('../api/server.js');
const request = supertest(server)



describe('test login', function (){
    it('shows status 200', async function (done){
        request
        .post('/api/auth/login')
        .send({
          username: 'BaronHarkonnen',
          password: 'test',
        })
        .expect(200)
        .end((err, response) => {
          token = response.body.token; 
          console.log(token)
          done();
        });
    });
});

describe('test register', function (){
    it('shows status 201', async function (done){
        request
        .post('/api/auth/register')
        .send({
          username: 'test2',
          password: 'test',
        })
        .expect(201)
        .end((err, response) => {
          token = response.body.token; 
          console.log(token)
          done();
        });
    });
});
