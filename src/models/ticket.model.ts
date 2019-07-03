/*
* model and schema for Ticket
*/
import { Schema, model } from 'mongoose'

class TicketModel {
  private schema: Schema
  private model: any

  constructor () {
    this.schema = new Schema({
      First_Name: { type: String, required: true },
      Last_Name: { type: String, required: true },
      Impact: { type: String, required: true },
      Reported_Source: { type: String, required: true },
      Service_Type: { type: String, required: true },
      Status: { type: String, required: true },
      Description: { type: String, required: true },
      Urgency: { type: String, required: true },
      Version: { type: Number, required: true },
      Updated_At: { type: Date, required: false }
    })

    this.model = model('ticket', this.schema)
  }

  create (data) {
    return new this.model(data)
  }

  getModel () {
    return this.model
  }

  getAllTickets (where, options, projection = null) {
    return this.model.find(where, projection, options)
  }
}

export const Ticket: TicketModel = new TicketModel()
