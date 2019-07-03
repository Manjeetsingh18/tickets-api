"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
/* eslint-disable */
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     description: Return all users
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
 *         description: Return success flag, and list of users
 */
/* eslint-enable */
router.get('/', middlewares_1.Auth.isLoggedin, middlewares_1.Paginator.initialise, controllers_1.UserController.getAllUsers);
/* eslint-disable */
/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - User
 *     description: Create new User
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User.email
 *         description: Email-id of user
 *         in: formData
 *         required: true
 *       - name: User.password
 *         description: Password of user
 *         in: formData
 *         required: true
 *       - name: User.fullName
 *         description: Fullname of user
 *         in: formData
 *         required: true
 *       - name: User.roles
 *         description: Roles to be assigned. Array of string.
 *         in: formData
 *         required: true
 *         type: array
 *         collectionFormat: multi
 *         items:
 *           type: string
 *         default: [standard]
 *         enum: [standard, member, administrator]
 *     responses:
 *       200:
 *         description: Return success flag, and user data
 */
/* eslint-enable */
router.post('/', middlewares_1.Auth.isAdminLoggedin, validators_1.UserValidator.createUser, controllers_1.UserController.createUser);
/* eslint-disable */
/**
 * @swagger
 * /users/{userid}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userid
 *         description: ID of user
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return success flag, and user data
 */
/* eslint-enable */
router.delete('/:userid', middlewares_1.Auth.isAdminLoggedin, controllers_1.UserController.deleteUser);
exports.UserRouter = router;
//# sourceMappingURL=user.routes.js.map