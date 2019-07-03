"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const filter_1 = require("express-validator/filter");
const models_1 = require("../models");
/*
* Controller to handle request to /tickets
*/
class TicketController {
    static createTicketType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = check_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            const postData = filter_1.matchedData(req);
            try {
                const result = yield models_1.TicketType.create(postData.TicketType).save();
                return res.status(200).json({ success: true, data: result });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static listTicketType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.TicketType.getAllTicketTypes({}, req.session.paginator);
            return res.status(200).json({ success: true, data });
        });
    }
    static createTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = check_1.validationResult(req);
            const postData = filter_1.matchedData(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            try {
                // insert ticket
                postData['Version'] = 1;
                postData['Updated_At'] = new Date();
                const result = yield models_1.Ticket.getModel().create(postData);
                return res.status(200).json({ success: true, data: result });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static updateTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = check_1.validationResult(req);
            const postData = filter_1.matchedData(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            try {
                // find ticket
                const ticketId = req.params.ticketId;
                const ticketVersion = Number(postData['Version']);
                const ticket = yield models_1.Ticket.getModel().findOne({ _id: ticketId });
                // compare ticket-id
                if (!ticket || !ticket._id) {
                    return res.status(422).json({ success: false, message: 'Invalid ticket-id.' });
                }
                // compare version
                if (ticketVersion !== ticket.Version) {
                    return res.status(422).json({ success: false, message: 'Invalid ticket version.', data: ticket });
                }
                // update ticket
                postData['Version'] = ticketVersion + 1;
                postData['Updated_At'] = new Date();
                const result = yield models_1.Ticket.getModel().updateOne({ _id: ticketId, Version: ticketVersion }, { $set: postData });
                if (result.nModified == 1) {
                    return res.status(200).json({ success: true, data: postData });
                }
                else {
                    return res.status(422).json({ success: false, message: 'No changes made to database.' });
                }
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static listTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.Ticket.getAllTickets({}, req.session.paginator);
            return res.status(200).json({ success: true, data });
        });
    }
    static getTicket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // find ticket
            const ticketId = req.params.ticketId;
            const ticket = yield models_1.Ticket.getModel().findOne({ _id: ticketId });
            return res.status(200).json({ success: true, data: ticket });
        });
    }
}
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map