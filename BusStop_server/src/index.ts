import express, { Request, Response } from "express";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
const cors = require("cors");
const app = express();
const PORT = 8080;
const apiRoutes = require("../routes/apiRoutes");
import fetchData from "../controller/stopData";
import { addBusData } from "../controller/busDataController";
app.use(express.json());
app.use(cors());

// app.use("api/data",apiRoutes)

// // app.post("/api/test",(req,res)=>{
// //     setInterval(addBusData,60000);
// //     res.json(200)
// // })

app.get("/test", async (req, res) => {
  try {
    const data = await fetchData();
    if (!data) {
      res.json(500);
    } else {
      res.json(JSON.parse(data));
    }
  } catch (error) {
    console.error(error);
    res.json(500).send("server Error!");
  }
});
app.use(express.static(path.join(__dirname, "../dist/")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`[server] Server is running at http://localhost:${PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("[server] Connected to MongoDB");
  })
  .catch((err: any) => {
    console.log(`[server] Mongo Error! ${err}`);
  });
