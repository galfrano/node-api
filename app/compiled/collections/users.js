"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let user = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    collection: "Users",
    versionKey: false
});
exports.default = (0, mongoose_1.model)("user", user);
//# sourceMappingURL=users.js.map