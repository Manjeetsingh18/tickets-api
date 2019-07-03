"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* model and schema for Ticket
*/
const mongoose_1 = require("mongoose");
class TicketModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
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
        });
        this.model = mongoose_1.model('ticket', this.schema);
    }
    create(data) {
        return new this.model(data);
    }
    getModel() {
        return this.model;
    }
    getAllTickets(where, options, projection = null) {
        return this.model.find(where, projection, options);
    }
}
exports.Ticket = new TicketModel();
//# sourceMappingURL=ticket.model.js.map