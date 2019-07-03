"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const passport = require("passport");
const moment = require("moment");
const passport_jwt_1 = require("passport-jwt");
const models_1 = require("../models");
class Auth {
    constructor() {
        this.initialize = () => {
            passport.use('jwt', this.getStrategy());
            return passport.initialize();
        };
        this.authenticate = (callback) => passport.authenticate('jwt', { session: false, failWithError: true }, callback);
        this.doLogin = (user) => this.genToken(user);
        this.genToken = (user) => {
            const expires = moment().utc().add({ minutes: 30 }).unix();
            const token = jwt.encode({
                exp: expires,
                user: user._id
            }, process.env.JWT_SECRET);
            return {
                token: `JWT ${token}`,
                expires: moment.unix(expires).utc(),
                user: user.fullName
            };
        };
        this.getStrategy = () => {
            const params = {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true
            };
            return new passport_jwt_1.Strategy(params, (req, payload, done) => {
                models_1.User.findUserById(payload.user)
                    .then((user) => {
                    /* istanbul ignore next: passport response */
                    if (user === null) {
                        return done(null, false, { message: 'The user in the token was not found' });
                    }
                    return done(null, { _id: user._id, email: user.email, fullName: user.fullName });
                })
                    .catch((err) => done(err));
            });
        };
    }
}
exports.default = new Auth();
//# sourceMappingURL=auth.controller.js.map