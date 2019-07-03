import { Router, Request, Response } from 'express'
import * as basicAuth from 'express-basic-auth'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import { SiteController } from '../controllers'
import { UserValidator } from '../validators'
import { Auth } from '../middlewares'

const router: Router = Router()
const basicAuthMiddleware = basicAuth({
  users: { admin: 'p@$$w0rd' },
  challenge: true,
  unauthorizedResponse: (req) => (
    req.auth
      ? (`Credentials ${req.auth.user}:${req.auth.password} rejected`)
      : 'No credentials provided'
  )
})

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
router.post('/login', UserValidator.login, SiteController.login)

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
router.get('/profile', Auth.isLoggedin, SiteController.profile)

export const SiteRouter: Router = router
