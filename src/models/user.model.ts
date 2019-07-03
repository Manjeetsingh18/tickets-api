/*
* model and schema for User
*/
import { Schema, model } from 'mongoose'

class UserModel {
  private schema: Schema
  private model: any

  constructor () {
    this.schema = new Schema({
      email: String,
      password: String,
      fullName: String,
      roles: [String]
    })

    this.model = model('user', this.schema)
  }

  createUser (user) {
    return new this.model(user)
  }

  getAllUsers (where, options, projection = null) {
    return this.model.find(where, projection, options)
  }

  findUserByEmail (email: string) {
    return this.model.findOne({ email })
  }

  findUserById (id: string) {
    return this.model.findOne({ _id: id })
  }

  deleteUserById (userid: string) {
    return this.model.findByIdAndRemove(userid)
  }
}

export const User: UserModel = new UserModel()
