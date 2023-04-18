"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let classSchema = new mongoose_1.Schema({
    classname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    no_of_places: {
        type: Number,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_by_name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true
    }
}, {
    collection: "Classes",
    versionKey: false
});
exports.default = (0, mongoose_1.model)("class", classSchema);
//# sourceMappingURL=classes.js.map