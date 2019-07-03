import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import * as bcrypt from 'bcrypt'
import { User } from '../models'

export class UserValidator {
  public static createUser = [
    check('User.email')
      .isEmail().withMessage('Invalid email address supplied')
      .trim()
      .normalizeEmail(),
    check('User.password', 'Password must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/),
    check('User.fullName', 'Full name can\'t be empty')
      .exists()
  ]

  public static login = [
    check('username')
      .isEmail().withMessage('Invalid email address supplied')
      .trim()
      .normalizeEmail()
      .custom((value, params) => {
        const req: Request = params.req
        req.session.user = null
        return User.findUserByEmail(value).then((user) => {
          if (!user || !user.email) {
            throw new Error('Incorrect email address')
          }
          req.session.user = user
        })
      }),
    check('password', 'Password must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/)
      .custom((value, params) => {
        const req: Request = params.req
        const user = req.session.user
        if (!user) {
          throw new Error('Incorrect user or password')
        }

        return bcrypt.compare(value, user.password).then((res) => {
          if (res !== true) {
            throw new Error('Incorrect password')
          }
        })
      })
  ]
}
