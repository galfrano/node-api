"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGODB_USER: U, MONGODB_PASSWORD: W, MONGODB_HOST: H, MONGODB_DOCKER_PORT: P, MONGODB_DATABASE: D, } = process.env;
const url = `mongodb://${U}:${W}@${H}:${P}/${D}?authSource=admin`;
console.log(url);
async function dbConnection() {
    try {
        await mongoose_1.default.connect(url);
        console.log('MongoDB connected!!');
        return mongoose_1.default;
    }
    catch (err) {
        console.log('Failed to connect to MongoDB', err);
        return null;
    }
}
exports.default = dbConnection;
//# sourceMappingURL=dbConnection.js.map