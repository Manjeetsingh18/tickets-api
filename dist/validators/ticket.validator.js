"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
class TicketValidator {
}
TicketValidator.createTicketType = [
    check_1.check('TicketType.title', 'Title can\'t be empty and must be at least 5 chars long')
        .trim().exists()
        .isLength({ min: 5 })
];
TicketValidator.createTicket = [
    check_1.check('First_Name')
        .trim().exists(),
    check_1.check('Last_Name')
        .trim().exists(),
    check_1.check('Impact')
        .trim().exists(),
    check_1.check('Reported_Source')
        .trim().exists(),
    check_1.check('Service_Type')
        .trim().exists(),
    check_1.check('Status')
        .trim().exists(),
    check_1.check('Description')
        .trim().exists(),
    check_1.check('Urgency')
        .trim().exists(),
    check_1.check('Version')
        .trim()
];
exports.TicketValidator = TicketValidator;
//# sourceMappingURL=ticket.validator.js.map