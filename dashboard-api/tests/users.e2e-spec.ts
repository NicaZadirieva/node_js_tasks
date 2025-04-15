import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
    const { app } = await boot;
    application = app;
});

describe('Users e2e', () => {
    it('Register - error', async () => {
        const res = await request(application.app)
        .post('/users/register')
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
        expect(res.statusCode).toBe(422);
    });
    it('Login - success', async () => {
        const res = await request(application.app)
        .post('/users/login')
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
        expect(res.statusCode).toBe(200);
        expect(res.body.jwt).not.toBe(undefined);
    });
    it('Login - failed', async () => {
        const res = await request(application.app)
        .post('/users/login')
        .send({ email: 'a@a.ru', password: '123', name: 'Nica'});
        expect(res.statusCode).toBe(401);
        expect(res.body.jwt).toBe(undefined);
    });


})

afterAll(() => {
    application.close();
})
