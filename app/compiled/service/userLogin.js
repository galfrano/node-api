"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.sanitizeUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const common_1 = require("../utility/common");
const makeToken = ({ _id: user_id, email }) => (jsonwebtoken_1.default.sign({ user_id, email }, process.env.SECURITY_KEY || 'secret', { expiresIn: "8h" }));
const sanitizeUser = async ({ first_name, last_name, email, password }) => {
    if ([first_name, email, password].filter((e) => !(0, common_1.notEmpty)(e)).length == 0) {
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const lowerCase = email.toLowerCase();
        return { first_name, last_name, email: lowerCase, password: hashed };
    }
    throw new Error('missing data');
};
exports.sanitizeUser = sanitizeUser;
const login = (user, password) => new Promise((resolve, reject) => bcryptjs_1.default.compare(user.password, password, (error, result) => error || !result ? reject({ error, result }) : resolve({ user, token: makeToken(user) })));
exports.login = login;
//# sourceMappingURL=userLogin.js.map