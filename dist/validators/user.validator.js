"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const bcrypt = require("bcrypt");
const models_1 = require("../models");
class UserValidator {
}
UserValidator.createUser = [
    check_1.check('User.email')
        .isEmail().withMessage('Invalid email address supplied')
        .trim()
        .normalizeEmail(),
    check_1.check('User.password', 'Password must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/),
    check_1.check('User.fullName', 'Full name can\'t be empty')
        .exists()
];
UserValidator.login = [
    check_1.check('username')
        .isEmail().withMessage('Invalid email address supplied')
        .trim()
        .normalizeEmail()
        .custom((value, params) => {
        const req = params.req;
        req.session.user = null;
        return models_1.User.findUserByEmail(value).then((user) => {
            if (!user || !user.email) {
                throw new Error('Incorrect email address');
            }
            req.session.user = user;
        });
    }),
    check_1.check('password', 'Password must be at least 5 chars long and contain one number')
        .isLength({ min: 5 })
        .matches(/\d/)
        .custom((value, params) => {
        const req = params.req;
        const user = req.session.user;
        if (!user) {
            throw new Error('Incorrect user or password');
        }
        return bcrypt.compare(value, user.password).then((res) => {
            if (res !== true) {
                throw new Error('Incorrect password');
            }
        });
    })
];
exports.UserValidator = UserValidator;
//# sourceMappingURL=user.validator.js.map