"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Database connection
 */
class Database {
    connectMongo(callback) {
        const DB_USER = process.env.DB_USER;
        const DB_PASS = process.env.DB_PASS;
        const DB_HOST = process.env.DB_HOST;
        const DB_PORT = process.env.DB_PORT;
        const DB_NAME = process.env.DB_NAME;
        let connString = null;
        if (process.env.DB_AUTH === 'true') {
            connString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        }
        else {
            connString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
        }
        mongoose_1.connect(connString, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log('Failed to connect to MongoDB:', err);
                if (callback)
                    callback(err);
                return;
            }
            console.log('Successfully connected to MongoDB');
            if (callback)
                callback();
        });
    }
}
exports.default = new Database();
//# sourceMappingURL=db.config.js.map