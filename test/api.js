var chai = require('chai');
chai.should();

var request = require('supertest')('http://jsonplaceholder.typicode.com');

describe('api', () => {
    it('get /post/1', (done) => {
        request
            .get('/posts')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                // console.log(res.body);
                done();
            });
    });

    it('post /posts', (done) => {
        let data = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        request
            .post('/posts')
            .send(data)
            .expect(201)
            .end(function(err, res) {
                if (err) throw err;
                let result = res.body;
                result.title.should.be.equal(data.title);
                result.body.should.be.equal(data.body);
                result.userId.should.be.equal(data.userId);
                done();
            });        
    });

    it('get /posts?userId=1', (done) => {
        let data = {
            title: 'foo',
            body: 'bar',
            userId: 1
        };

        request
            .get('/posts')
            .query({userId: 1})
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                let result = res.body[0];
                result.userId.should.be.equal(1);
                done();
            });        
    });
});

