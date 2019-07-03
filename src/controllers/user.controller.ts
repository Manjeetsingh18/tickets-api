import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import * as bcrypt from 'bcrypt'
import { User } from '../models'

/*
* Controller to handle request to /users
*/
export class UserController {
  static async getAllUsers (req: Request, res: Response) {
    const data = await User.getAllUsers({}, req.session.paginator)
    return res.status(200).json({ success: true, data })
  }

  static async createUser (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const postData = matchedData(req)
    try {
      postData.User.password = await bcrypt.hash(postData.User.password, 10)
      const result = await User.createUser(postData.User).save()
      return res.status(200).json({ success: true, data: result })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async deleteUser (req: Request, res: Response) {
    const userId = req.params.userid
    try {
      const result = await User.deleteUserById(userId)
      return res.status(200).json({ success: true, data: result })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}
