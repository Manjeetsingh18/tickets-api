"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* model and schema for User
*/
const mongoose_1 = require("mongoose");
class UserModel {
    constructor() {
        this.schema = new mongoose_1.Schema({
            email: String,
            password: String,
            fullName: String,
            roles: [String]
        });
        this.model = mongoose_1.model('user', this.schema);
    }
    createUser(user) {
        return new this.model(user);
    }
    getAllUsers(where, options, projection = null) {
        return this.model.find(where, projection, options);
    }
    findUserByEmail(email) {
        return this.model.findOne({ email });
    }
    findUserById(id) {
        return this.model.findOne({ _id: id });
    }
    deleteUserById(userid) {
        return this.model.findByIdAndRemove(userid);
    }
}
exports.User = new UserModel();
//# sourceMappingURL=user.model.js.map