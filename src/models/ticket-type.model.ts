/*
* model and schema for TicketType
*/
import { Schema, model } from 'mongoose'

class TicketTypeModel {
  private schema: Schema
  private model: any

  constructor () {
    this.schema = new Schema({
      title: { type: String, required: true }
    })

    this.model = model('ticket_type', this.schema)
  }

  create (data) {
    return new this.model(data)
  }

  getAllTicketTypes (where, options, projection = null) {
    return this.model.find(where, projection, options)
  }
}

export const TicketType: TicketTypeModel = new TicketTypeModel()
