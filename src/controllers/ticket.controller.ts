import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import { Ticket, TicketType } from '../models'
import * as mongoose from 'mongoose'
import * as moment from 'moment'

/*
* Controller to handle request to /tickets
*/
export class TicketController {
  static async createTicketType (req: Request, res: Response) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const postData = matchedData(req)
    try {
      const result = await TicketType.create(postData.TicketType).save()
      return res.status(200).json({ success: true, data: result })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async listTicketType (req: Request, res: Response) {
    const data = await TicketType.getAllTicketTypes({}, req.session.paginator)
    return res.status(200).json({ success: true, data })
  }

  static async createTicket (req: Request, res: Response) {
    const errors = validationResult(req)
    const postData = matchedData(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    try {
      // insert ticket
      postData['Version'] = 1
      postData['Updated_At'] = new Date()
      const result = await Ticket.getModel().create(postData)
      return res.status(200).json({ success: true, data: result })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async updateTicket (req: Request, res: Response) {
    const errors = validationResult(req)
    const postData = matchedData(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    try {
      // find ticket
      const ticketId = req.params.ticketId
      const ticketVersion = Number(postData['Version'])
      const ticket = await Ticket.getModel().findOne({ _id: ticketId })
      // compare ticket-id
      if (!ticket || !ticket._id) {
        return res.status(422).json({ success: false, message: 'Invalid ticket-id.' })
      }
      // compare version
      if (ticketVersion !== ticket.Version) {
        return res.status(422).json({ success: false, message: 'Invalid ticket version.', data: ticket })
      }
      // update ticket
      postData['Version'] = ticketVersion + 1
      postData['Updated_At'] = new Date()
      const result = await Ticket.getModel().updateOne({ _id: ticketId, Version: ticketVersion }, { $set: postData })
      if (result.nModified == 1) {
        return res.status(200).json({ success: true, data: postData })
      } else {
        return res.status(422).json({ success: false, message: 'No changes made to database.' })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async listTicket (req: Request, res: Response) {
    const data = await Ticket.getAllTickets({ }, req.session.paginator)
    return res.status(200).json({ success: true, data })
  }

  static async getTicket (req: Request, res: Response) {
    // find ticket
    const ticketId = req.params.ticketId
    const ticket = await Ticket.getModel().findOne({ _id: ticketId })

    return res.status(200).json({ success: true, data: ticket })
  }
}
