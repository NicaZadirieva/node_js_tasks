import request from 'supertest';
import { App } from '../src/app';
import { boot } from '../src/main';

let application: App;

beforeAll(async () => {
    const { app } = await boot;
    application = app;
});
let jwt: string;

describe('Users e2e', () => {
    it('Register - error', async () => {
        const res = await request(application.app)
        .post('/users/register')
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
        expect(res.statusCode).toBe(422);
    });
  
    it('Login - failed', async () => {
        const res = await request(application.app)
        .post('/users/login')
        .send({ email: 'a@a.ru', password: '123', name: 'Nica'});
        expect(res.statusCode).toBe(401);
        expect(res.body.jwt).toBe(undefined);
    });

    it('Login - success', async () => {
        const res = await request(application.app)
        .post('/users/login')
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
        jwt = res.body.jwt;
        expect(res.statusCode).toBe(200);
        expect(res.body.jwt).not.toBe(undefined);
    });
    it('getInfo - success', async () => {
        const res = await request(application.app)
        .get('/users/info')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
   
        expect(res.body.email).toBe('a@a.ru');
        expect(res.statusCode).toBe(200);

    });
    it('getInfo - failed', async () => {
        const res = await request(application.app)
        .get('/users/info')
        .set('Authorization', `Bearer ${'1234567'}`)
        .send({ email: 'a@a.ru', password: '1', name: 'Nica'});
   
        expect(res.body.email).toBe(undefined);
        expect(res.statusCode).toBe(401);

    });


})

afterAll(() => {
    application.close();
})
