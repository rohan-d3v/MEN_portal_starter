process.env.NODE_ENV = 'test';

const expect = require('chai').expect, request = require('supertest'), app = require('../server');

describe('Frontend', function () {
    it('Get Homepage', function (done) {
        request(app).get('/').expect(200, done);
    });
});