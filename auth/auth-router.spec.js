const supertest = require('supertest');
const server = require('../api/server.js');
const request = supertest(server)



describe('test login', function (){
    it('shows status 200', async function (done){
        request
        .post('/api/auth/login')
        .send({ username: 'test', password: 'test'})
        .set('Accept', 'application/jason')
        .expect(200)
        .end(function(err, res){
            if (err) return done (err);
            done();
        });
    });
})
