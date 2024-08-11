"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBusData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const busData_1 = require("../model/busData");
const BusData = mongoose_1.default.model("BusData", busData_1.busDataSchema);
const addBusData = (busData) => __awaiter(void 0, void 0, void 0, function* () {
    let newData = new BusData({
        busInfo: busData
    });
    yield newData.save();
});
exports.addBusData = addBusData;
