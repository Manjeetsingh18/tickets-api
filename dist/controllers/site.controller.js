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
const auth_controller_1 = require("./auth.controller");
/*
* Controller to handle request to /users
*/
class SiteController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = check_1.validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ errors: errors.mapped() });
                }
                // const postData = matchedData(req)
                const user = req.session.user;
                const result = auth_controller_1.default.doLogin(user);
                return res.status(200).json({ success: true, data: result });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.session.user;
                return res.status(200).json({ success: true, data: user });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        });
    }
}
exports.SiteController = SiteController;
//# sourceMappingURL=site.controller.js.map