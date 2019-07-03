"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const App_1 = require("../App");
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
describe('User', () => {
    describe('POST /users', () => {
        it('validate empty formData', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': {} })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors ||
                    !res.body.errors['User.email'] ||
                    !res.body.errors['User.password'] ||
                    !res.body.errors['User.fullName'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate email test', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'email': 'test' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors || !res.body.errors['User.email'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate email test@example', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'email': 'test@example' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors || !res.body.errors['User.email'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate email test@example.com123', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'email': 'test@example.com123' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors || !res.body.errors['User.email'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate password xyz', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'password': 'xyz' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors || !res.body.errors['User.password'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate password xyz1', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'password': 'xyz1' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (!res.body.errors || !res.body.errors['User.password'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('validate password xyz123', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': { 'password': 'xyz123' } })
                .expect('Content-Type', /json/)
                .expect(422)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (res.body.errors['User.password'])
                    return done('Error in server response');
                else
                    done();
            });
        });
        it('insert new user', (done) => {
            request(App_1.default)
                .post('/api/v1/users')
                .send({ 'User': {
                    'email': `test-${getRandomInt(1, 99999)}@example.com`,
                    'password': 'xyz123',
                    'fullName': 'New test'
                } })
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                if (err)
                    return done(err);
                if (res.body.errors)
                    return done('Error in server response');
                else {
                    // start delete user test
                    request(App_1.default)
                        .delete(`/api/v1/users/${res.body.data._id}`)
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end((err, res2) => {
                        if (err)
                            return done(err);
                        if (res2.body.errors || !res2.body.data)
                            return done('Error in server response');
                        else
                            done();
                    });
                    // end delete user test
                }
            });
        }).timeout(4000);
    });
});
//# sourceMappingURL=users.spec.js.map