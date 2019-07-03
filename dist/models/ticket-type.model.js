"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* model and schema for TicketType
*/
const mongoose_1 = require("mongoose");
class TicketTypeModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
            title: { type: String, required: true }
        });
        this.model = mongoose_1.model('ticket_type', this.schema);
    }
    create(data) {
        return new this.model(data);
    }
    getAllTicketTypes(where, options, projection = null) {
        return this.model.find(where, projection, options);
    }
}
exports.TicketType = new TicketTypeModel();
//# sourceMappingURL=ticket-type.model.js.map