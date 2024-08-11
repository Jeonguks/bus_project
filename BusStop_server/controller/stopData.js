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
const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
const lineid = "5291010000";
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let activatedBusData = [];
            let activatedBusWhere = [];
            let activatedBusStopidx = [];
            let busData = [];
            const response = yield axios_1.default.get(url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid, { responseType: "text" });
            const result = response.data;
            const parsedData = yield (0, xml2js_1.parseStringPromise)(result); // parse xml to Object
            const trimedData = parsedData.response.body[0].items[0].item;
            //const jsonData = JSON.stringify(trimedData) // parse Object to JSON
            const stopsWithGpsym = trimedData.filter((stop) => stop.gpsym);
            stopsWithGpsym.forEach((item) => {
                activatedBusData.push(item.gpsym[0]);
                activatedBusWhere.push(item.bstopnm[0]);
                activatedBusStopidx.push(item.bstopidx[0]);
            });
            //console.log(activatedBusData) //gps에 연결된 버스의 gps 마지막 연결시간 hhmmss
            //
            //console.log(stopsWithGpsym) //현재 운행중인 버스의 전체 정보
            const activeBusDataJson = {
                activatedBusCtn: activatedBusData.length,
                activatedBusTime: activatedBusData,
                activatedBusWhere: activatedBusWhere,
                activatedBusStopidx: activatedBusStopidx
            };
            console.log(activeBusDataJson);
            return activeBusDataJson;
            //return jsonData
            //console.log(trimedData);
            // for (let i =0;i<jsonData.length;i++){
            //   let newData = {
            //     bstopidx : jsonData[i].bstopidx[0],
            //     isPassed : 'carno' in trimedData.item[i],
            //   }
            //   busData[i] = newData
            // }
            // addBusData(busData)
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = fetchData;
