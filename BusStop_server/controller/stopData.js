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
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const xml2js_1 = require("xml2js");
//import { addBusData } from "./busDataController";
const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
const lineid = "5291010000";
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        try {
            const response = yield axios_1.default.get(url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid, { responseType: "text" });
            const parsedData = yield (0, xml2js_1.parseStringPromise)(response.data); // parse xml to Object
            const trimedData = (_e = (_d = (_c = (_b = (_a = parsedData === null || parsedData === void 0 ? void 0 : parsedData.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.items) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.item;
            if (!trimedData) {
                throw new Error("Unexpected data structure from API response");
            }
            const stopsWithGpsym = trimedData.filter((stop) => stop.gpsym);
            let activatedBusData = [];
            let activatedBusWhere = [];
            let activatedBusStopidx = [];
            stopsWithGpsym.forEach((item) => {
                activatedBusData.push(item.gpsym[0]);
                activatedBusWhere.push(item.bstopnm[0]);
                activatedBusStopidx.push(item.bstopidx[0]);
            });
            const activeBusDataJson = {
                activatedBusCtn: activatedBusData.length,
                activatedBusTime: activatedBusData,
                activatedBusWhere: activatedBusWhere,
                activatedBusStopidx: activatedBusStopidx,
            };
            //console.log(activatedBusData) //gps에 연결된 버스의 gps 마지막 연결시간 hhmmss
            //
            //console.log(stopsWithGpsym) //현재 운행중인 버스의 전체 정보
            return activeBusDataJson;
        }
        catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    });
}
exports.default = fetchData;
