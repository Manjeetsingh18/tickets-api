import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import { matchedData, sanitize } from 'express-validator/filter'
import { TicketController } from '../controllers'
import { TicketValidator } from '../validators'
import { Auth, Paginator } from '../middlewares'

const router: Router = Router()

/* eslint-disable */
/**
 * @swagger
 * /tickets:
 *   get:
 *     tags:
 *       - Ticket
 *     description: Return all tickets
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         description: No of records to fetch
 *         in: query
 *         required: false
 *         type: Number
 *         default: 20
 *     responses:
 *       200:
 *         description: Return success flag, and list of tickets
 */
/* eslint-enable */
router.get('/', Paginator.initialise, TicketController.listTicket)

/* eslint-disable */
/**
 * @swagger
 * /tickets:
 *   post:
 *     tags:
 *       - Ticket
 *     description: Insert new ticket
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Ticket
 *         description: Ticket object to write
 *         in: formData
 *         required: true
 *         type: object
 *         schema: 
 *           $ref: '#/definitions/Ticket'
 *     responses:
 *       200:
 *         description: Return success flag
 * 
 * definitions:
 *   Ticket:
 *     type: object
 *     properties:
 *       First_Name:
 *         type: string
 *       Last_Name:
 *         type: string
 *       Impact:
 *         type: string
 *       Reported_Source:
 *         type: string
 *       Service_Type:
 *         type: string
 *       Status:
 *         type: string
 *       Description:
 *         type: string
 *       Urgency:
 *         type: string
 *       Version:
 *         type: number
 *       Updated_At:
 *         type: date
 */
/* eslint-enable */
router.post('/', TicketValidator.createTicket, TicketController.createTicket)

/* eslint-disable */
/**
 * @swagger
 * /tickets/{ticketId}:
 *   put:
 *     tags:
 *       - Ticket
 *     description: Update ticket
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ticketId
 *         description: Ticket-id
 *         in: path
 *         required: true
 *         type: string
 *       - name: Ticket
 *         description: Ticket object to write
 *         in: formData
 *         required: true
 *         type: object
 *         schema: 
 *           $ref: '#/definitions/Ticket'
 *     responses:
 *       200:
 *         description: Return success flag
 * 
 */
/* eslint-enable */
router.put('/:ticketId', TicketValidator.createTicket, TicketController.updateTicket)

/* eslint-disable */
/**
 * @swagger
 * /tickets/{ticketId}:
 *   get:
 *     tags:
 *       - Ticket
 *     description: Get ticket
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ticketId
 *         description: Ticket-id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Return success flag
 * 
 */
/* eslint-enable */
router.get('/:ticketId', TicketController.getTicket)

router.get('/types', Paginator.initialise, TicketController.listTicketType)
router.post('/types', TicketValidator.createTicketType, TicketController.createTicketType)

export const TicketRouter: Router = router
