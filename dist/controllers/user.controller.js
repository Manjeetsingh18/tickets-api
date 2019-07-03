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
const bcrypt = require("bcrypt");
const models_1 = require("../models");
/*
* Controller to handle request to /users
*/
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield models_1.User.getAllUsers({}, req.session.paginator);
            return res.status(200).json({ success: true, data });
        });
    }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = check_1.validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.mapped() });
            }
            const postData = filter_1.matchedData(req);
            try {
                postData.User.password = yield bcrypt.hash(postData.User.password, 10);
                const result = yield models_1.User.createUser(postData.User).save();
                return res.status(200).json({ success: true, data: result });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userid;
            try {
                const result = yield models_1.User.deleteUserById(userId);
                return res.status(200).json({ success: true, data: result });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map