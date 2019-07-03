"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* src/models/index.ts */
const db_config_1 = require("../configurations/db.config");
// db.connectMySQL()
db_config_1.default.connectMongo();
var user_model_1 = require("./user.model");
exports.User = user_model_1.User;
var ticket_type_model_1 = require("./ticket-type.model");
exports.TicketType = ticket_type_model_1.TicketType;
var ticket_model_1 = require("./ticket.model");
exports.Ticket = ticket_model_1.Ticket;
//# sourceMappingURL=index.js.map