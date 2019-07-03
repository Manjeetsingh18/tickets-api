"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const basicAuth = require("express-basic-auth");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
const basicAuthMiddleware = basicAuth({
    users: { admin: 'p@$$w0rd' },
    challenge: true,
    unauthorizedResponse: (req) => (req.auth
        ? (`Credentials ${req.auth.user}:${req.auth.password} rejected`)
        : 'No credentials provided')
});
/* eslint-disable */
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     security:
 *       - basicAuth: []
 *     description: Authenticate user and login to system
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Email-id of user
 *         in: formData
 *         required: true
 *       - name: password
 *         description: Password of user
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: Return success flag, and user data
 */
/* eslint-enable */
router.post('/login', validators_1.UserValidator.login, controllers_1.SiteController.login);
/* eslint-disable */
/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *       - User
 *     description: Fetch logged-in user profile data
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: JWT token
 *         in: header
 *         required: true
 *         type: string
 *         default: Bearer {token}
 *     responses:
 *       200:
 *         description: Return success flag, and user data
 */
/* eslint-enable */
router.get('/profile', middlewares_1.Auth.isLoggedin, controllers_1.SiteController.profile);
exports.SiteRouter = router;
//# sourceMappingURL=site.routes.js.map