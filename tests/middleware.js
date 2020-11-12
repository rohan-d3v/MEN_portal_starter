process.env.NODE_ENV = 'test';

const expect = require('chai').expect, request = require('supertest'), app = require('../server');

const validCredentials = { "mobile": "9874563210", "password": "Demo@123" }

var validUser = request.agent(app);
before(function (done) {
    validUser.post('/login').send(validCredentials).end(function (err, response) {
        expect('Location', '/dashboard');
        done();
    });
});

const invalidCredentials = { "mobile": "9874563210", "password": "asdasdasd" }

var invalidUser = request.agent(app)
before(function (done) {
    invalidUser.post('/login').send(invalidCredentials).end(function (err, response) {
        expect('Location', '/');
        done();
    });
});

describe('Middleware', function () {
    describe('Login', function () {
        it('Valid Credentials', function (done) {
            validUser.get('/dashboard').expect(200, done);
        });
        it('Invalid Credentials', function (done) {
            invalidUser.get('/dashboard').expect('Location', '/').expect(302, done);
        });
        it('No Credentials', function (done) {
            request(app).get('/dashboard').expect('Location', '/').expect(302, done);
        });
    })
});

