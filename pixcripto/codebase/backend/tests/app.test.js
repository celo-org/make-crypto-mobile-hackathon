const request = require('supertest')
const app = require('../src/index.js')

test('Deve responder na raiz', () => request(app).get('/')
    .then((res) => {
        expect(res.status).toBe(200);
    })
);