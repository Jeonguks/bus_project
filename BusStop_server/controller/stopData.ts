import axios from "axios";
import "dotenv/config";
import { parseStringPromise } from "xml2js";
import { addBusData } from "./busDataController";

const url = "https://apis.data.go.kr/6260000/BusanBIMS/busInfoByRouteId";
const lineid = "5291010000";

async function fetchData() {

  try {
    let busData = []
    const response = await axios.get(
      url + "?serviceKey=" + process.env.BUSAPI_KEY + "&lineid=" + lineid,
      { responseType: "text" }
    );
    const result = response.data;
    const parsedData = await parseStringPromise(result); // parse xml to Object
    const trimedData = parsedData.response.body[0].items[0].item;
    const jsonData = JSON.stringify(trimedData) // parse Object to JSON
    
    const stopsWithGpsym = trimedData.filter((stop: { gpsym: any; }) => stop.gpsym);

    console.log(stopsWithGpsym)
    return jsonData
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
