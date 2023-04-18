"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let attendees = new mongoose_1.Schema({
    class_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, {
    collection: "Attendees",
    versionKey: false
});
exports.default = (0, mongoose_1.model)("attendee", attendees);
//# sourceMappingURL=attendees.js.map