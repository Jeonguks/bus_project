"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busDataSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.busDataSchema = new Schema({
    busInfo: {
        type: Object,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});
