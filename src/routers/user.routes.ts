import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import { UserController } from '../controllers'
import { UserValidator } from '../validators'
import { Auth, Paginator } from '../middlewares'

const router: Router = Router()

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
router.get('/', Auth.isLoggedin, Paginator.initialise, UserController.getAllUsers)

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
router.post('/', Auth.isAdminLoggedin, UserValidator.createUser, UserController.createUser)

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
router.delete('/:userid', Auth.isAdminLoggedin, UserController.deleteUser)

export const UserRouter: Router = router
