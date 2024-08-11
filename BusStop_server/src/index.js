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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors = require("cors");
const app = (0, express_1.default)();
const PORT = 8080;
const apiRoutes = require("../routes/apiRoutes");
const stopData_1 = __importDefault(require("../controller/stopData"));
app.use(express_1.default.json());
app.use(cors());
// app.use("api/data",apiRoutes)
// // app.post("/api/test",(req,res)=>{
// //     setInterval(addBusData,60000);
// //     res.json(200)
// // })
app.get("/getActiveBus", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeBusData = yield (0, stopData_1.default)();
        if (!activeBusData) {
            res.json(500);
        }
        else {
            res.json(JSON.stringify(activeBusData));
        }
    }
    catch (error) {
        console.error(error);
        res.json(500).send("Server Error!");
    }
}));
// app.get("/test", async (req, res) => {
//   try {
//     const data = await fetchData();
//     if (!data) {
//       res.json(500);
//     } else {
//       res.json(JSON.parse(data));
//     }
//   } catch (error) {
//     console.error(error);
//     res.json(500).send("server Error!");
//   }
// });
app.use(express_1.default.static(path_1.default.join(__dirname, "../dist/")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../dist/index.html"));
});
app.listen(PORT, () => {
    console.log(`[server] Server is running at http://localhost:${PORT}`);
});
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("[server] Connected to MongoDB");
})
    .catch((err) => {
    console.log(`[server] Mongo Error! ${err}`);
});
