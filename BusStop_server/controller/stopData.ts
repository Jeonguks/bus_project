import axios from "axios";
import "dotenv/config";
import { parseStringPromise } from "xml2js";
import { addBusData } from "./busDataController";

const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
const lineid = "5291010000";

async function fetchData() {
  try {
    let activatedBusData: string[] = [];
    let activatedBusWhere: string[] = [];
    let busData = [];
    const response = await axios.get(
      url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid,
      { responseType: "text" }
    );
    const result = response.data;
    const parsedData = await parseStringPromise(result); // parse xml to Object
    const trimedData = parsedData.response.body[0].items[0].item;
    //const jsonData = JSON.stringify(trimedData) // parse Object to JSON


    const stopsWithGpsym = trimedData.filter(
      (stop: { gpsym: any }) => stop.gpsym
    );

    //console.log(stopsWithGpsym.length) //현재 운행중인 버스 수

    stopsWithGpsym.forEach((item: { bstopnm: string[]; gpsym: string[] }) => {
      activatedBusData.push(item.gpsym[0]);
      activatedBusWhere.push(item.bstopnm[0]);
    });
    //console.log(activatedBusData) //gps에 연결된 버스의 gps 마지막 연결시간 hhmmss

    //
    //console.log(stopsWithGpsym) //현재 운행중인 버스의 전체 정보

    const activeBusDataJson = {
      activatedBusCtn: activatedBusData.length,
      activatedBusTime: activatedBusData,
      activatedBusWhere: activatedBusWhere,
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
  } catch (error) {
    console.error(error);
  }
}

export default fetchData;
