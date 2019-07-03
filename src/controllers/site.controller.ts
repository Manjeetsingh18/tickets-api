import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import AuthController from './auth.controller'

/*
* Controller to handle request to /users
*/
export class SiteController {
  static async login (req: Request, res: Response) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() })
      }
      // const postData = matchedData(req)
      const user = req.session.user
      const result = AuthController.doLogin(user)
      return res.status(200).json({ success: true, data: result })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async profile (req: Request, res: Response) {
    try {
      const user = req.session.user
      return res.status(200).json({ success: true, data: user })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}
