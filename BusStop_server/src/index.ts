import express, { Request, Response } from "express";
//import path from "path";
//import mongoose from "mongoose";
import "dotenv/config";

const cors = require("cors");
const app = express();
const PORT = 8080;

import fetchData from "../controller/stopData";
//import { addBusData } from "../controller/busDataController";
import fetchAPI from "../controller/fetchAPI";

app.use(express.json());
app.use(cors());

app.get("/api/bus", async (req, res) => {
  try {
    const areaId = req.query.areaId as string;
    if (!areaId) {
      return res.status(400).json({ message: "areaId is invalid" });
    }
    const activeBusData = await fetchAPI(areaId);
    if (!activeBusData) {
      return res.status(404).json({ message: "Not Found" }); // Not Found Error
    }
    res.json(JSON.stringify(activeBusData));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Errorr" }); //Internal Server Error
  }
});

app.get("/getActiveBus", async (req, res) => {
  try {
    const activeBusData = await fetchData();
    if (!activeBusData) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(JSON.stringify(activeBusData));
    }
  } catch (error) {
    console.error(error);
    res.json(500).send("Server Error!");
  }
});

// app.use(express.static(path.join(__dirname, "../dist/")));

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`[server] Server is running at http://localhost:${PORT}`);
});

// mongoose
//   .connect(process.env.MONGO_URI as string)
//   .then(() => {
//     console.log("[server] Connected to MongoDB");
//   })
//   .catch((err: any) => {
//     console.log(`[server] Mongo Error! ${err}`);
//   });
