import axios from "axios";
import "dotenv/config";
import { parseStringPromise } from "xml2js";
//import { addBusData } from "./busDataController";

const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
const lineid = "5291010000";

async function fetchData() {
  try {
    const response = await axios.get(
      url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid,
      { responseType: "text" }
    );
    const parsedData = await parseStringPromise(response.data); // parse xml to Object

    const trimedData = parsedData?.response?.body?.[0]?.items?.[0]?.item;

    if (!trimedData) {
      throw new Error("Unexpected data structure from API response");
    }
    const stopsWithGpsym = trimedData.filter(
      (stop: { gpsym: any }) => stop.gpsym
    );

    let activatedBusData: string[] = [];
    let activatedBusWhere: string[] = [];
    let activatedBusStopidx: string[] = [];

    stopsWithGpsym.forEach(
      (item: { bstopidx: string[]; bstopnm: string[]; gpsym: string[] }) => {
        activatedBusData.push(item.gpsym[0]);
        activatedBusWhere.push(item.bstopnm[0]);
        activatedBusStopidx.push(item.bstopidx[0]);
      }
    );

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
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

export default fetchData;
