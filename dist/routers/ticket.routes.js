"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const router = express_1.Router();
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
router.get('/', middlewares_1.Paginator.initialise, controllers_1.TicketController.listTicket);
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
router.post('/', validators_1.TicketValidator.createTicket, controllers_1.TicketController.createTicket);
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
router.put('/:ticketId', validators_1.TicketValidator.createTicket, controllers_1.TicketController.updateTicket);
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
router.get('/:ticketId', controllers_1.TicketController.getTicket);
router.get('/types', middlewares_1.Paginator.initialise, controllers_1.TicketController.listTicketType);
router.post('/types', validators_1.TicketValidator.createTicketType, controllers_1.TicketController.createTicketType);
exports.TicketRouter = router;
//# sourceMappingURL=ticket.routes.js.map