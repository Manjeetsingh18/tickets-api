import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'

export class TicketValidator {
  public static createTicketType = [
    check('TicketType.title', 'Title can\'t be empty and must be at least 5 chars long')
      .trim().exists()
      .isLength({ min: 5 })
  ]

  public static createTicket = [
    check('First_Name')
      .trim().exists(),
    check('Last_Name')
      .trim().exists(),
    check('Impact')
      .trim().exists(),
    check('Reported_Source')
      .trim().exists(),
    check('Service_Type')
      .trim().exists(),
    check('Status')
      .trim().exists(),
    check('Description')
      .trim().exists(),
    check('Urgency')
      .trim().exists(),
    check('Version')
      .trim()
  ]
}
