"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
class Auth {
    static isLoggedin(req, res, next) {
        return auth_controller_1.default.authenticate((err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                if (info.name === 'TokenExpiredError') {
                    res.status(401).json({ message: 'Your token has expired. Please re-enter your login details.' });
                }
                else {
                    res.status(401).json({ message: info.message });
                }
                return null;
            }
            req.session.user = user;
            return next();
        })(req, res, next);
    }
    static isAdminLoggedin(req, res, next) {
        next();
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map