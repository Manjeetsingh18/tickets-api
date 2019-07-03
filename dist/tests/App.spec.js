"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const App_1 = require("../App");
const db_config_1 = require("../configurations/db.config");
describe('App', () => {
    it('ping http', (done) => {
        supertest(App_1.default)
            .get('/')
            .expect('Content-Type', /text\/plain/)
            .expect(200)
            .end((err, res) => {
            if (err)
                return done(err);
            else if (res.text !== 'OK')
                return done('Error in server response');
            else
                done();
        });
    });
    it('connect mongodb', (done) => {
        db_config_1.default.connectMongo(done);
    }).timeout(4000);
});
//# sourceMappingURL=App.spec.js.map