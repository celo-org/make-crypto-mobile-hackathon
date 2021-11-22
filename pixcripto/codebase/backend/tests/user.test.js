const request = require('supertest');
const app = require('../src/index');
const cpf = require('cpf')

jest.setTimeout(10000)

const registerRoute = '/v1/register'
const loginRoute = '/v1/login'

test('Deve criar um usuário com sucesso', async () => {
    await request(app).post(registerRoute)
        .send({ name: 'teste', email: `${Date.now()}@gmail.com`, password: 'abc1234', cpf: cpf.generate().toString() })
        .then((res) => {
            if (res.body.error) console.log(res.body.error)
            expect(res.status).toBe(201);
        });
});

test('Não deve criar usuário sem nome', async () => {
    await request(app).post(registerRoute)
        .send({ email: `${Date.now()}@gmail.com`, password: 'abc1234', cpf: cpf.generate().toString() })
        .then((res) => {
            expect(res.status).toBe(400);
        });
});

test('Deve criar um usuário sem senha', async () => {
    await request(app).post(registerRoute)
        .send({ name: 'teste', email: `${Date.now()}@gmail.com`, cpf: cpf.generate().toString() })
        .then((res) => {
            expect(res.status).toBe(400);
        });
});

test('Não deve criar usuário sem email', async () => {
    await request(app).post(registerRoute)
        .send({ name: 'teste', password: 'abc1234', cpf: cpf.generate().toString() })
        .then((res) => {
            expect(res.status).toBe(400);
        });
});

test('Não deve inserir um usuário que já existe', async () => {
    const email = `${Date.now()}@gmail.com`
    let ncpf = cpf.generate(false)
    const payload = { name: 'teste', email, password: 'abc1234', cpf: ncpf }
    await request(app).post(registerRoute)
        .send(payload)
        .then((res) => {
            expect(res.status).toBe(201);
        });
    await request(app).post(registerRoute)
        .send(payload)
        .then((res) => {
            if (res.body.error) console.log(res.body.error)
            expect(res.status).toBe(422);
        });
});

describe('Login Tests', () => {
    const email = `${Date.now()}@gmail.com`
    const password = 'abc1234'
    beforeAll(async () => {
        await request(app).post(registerRoute)
            .send({ name: 'teste', email, password, cpf: cpf.generate().toString() })
            .then((res) => {
                if (res.body.error) console.log(res.body.error)
                expect(res.status).toBe(201);
            });
    });
    test('Deve fazer login com um usuário criado previamente', async () => {
        await request(app).get(loginRoute)
            .send({ email, password })
            .then((res) => {
                if(res.body.error) console.log(res.body.error)
                expect(res.status).toBe(200);
            });
    })

    test('Não deve fazer login sem email', async () => {
        await request(app).get(loginRoute)
            .send({ password })
            .then((res) => {
                if(res.body.error) console.log(res.body.error)
                expect(res.status).toBe(400);
            });
    })

    test('Não deve fazer login sem senha', async () => {
        await request(app).get(loginRoute)
            .send({ email })
            .then((res) => {
                if(res.body.error) console.log(res.body.error)
                expect(res.status).toBe(400);
            });
    })
});