/* src/models/index.ts */
import db from '../configurations/db.config'
// db.connectMySQL()
db.connectMongo()

export { User } from './user.model'
export { TicketType } from './ticket-type.model'
export { Ticket } from './ticket.model'
