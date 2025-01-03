import axios from "axios";
import "dotenv/config";
import { parseStringPromise } from "xml2js";

const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
let lineid: string | null = null;

async function fetchAPI(areaId: string) {
  switch (areaId) {
    case "SH":
      lineid = "5291010000";
      break;
    case "GD":
      lineid = "5290205000";
      break;
    default:
      return null;
  }
  try {
    let busCarno: string[] = [];
    let busTime: string[] = [];
    let busWhere: string[] = [];
    let busStopIdx: string[] = [];

    const response = await axios.get(
      url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid,
      { responseType: "text" }
    );
    const parsedData = await parseStringPromise(response.data); // parse xml to Object
    const trimedData = parsedData.response.body[0].items[0].item;
    //const jsonData = JSON.stringify(trimedData) // parse Object to JSON

    const stopsWithGpsym = trimedData.filter(
      (stop: { gpsym: any }) => stop.gpsym
    );

    stopsWithGpsym.forEach(
      (item: {
        carno: string[];
        bstopidx: string[];
        bstopnm: string[];
        gpsym: string[];
      }) => {
        busCarno.push(item.carno[0]);
        busTime.push(item.gpsym[0]);
        busWhere.push(item.bstopnm[0]);
        busStopIdx.push(item.bstopidx[0]);
      }
    );

    const activeBusDataJson = {
      busCarno: busCarno,
      busTime: busTime,
      busWhere: busWhere,
      busStopIdx: busStopIdx,
    };
    //console.log(response.data);
    //console.log(activeBusDataJson);
    return activeBusDataJson;
  } catch (error) {
    console.error(error);
  }
}

export default fetchAPI;
