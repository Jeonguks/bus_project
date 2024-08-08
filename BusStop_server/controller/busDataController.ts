import mongoose, { MongooseError } from "mongoose";
import { busDataSchema } from "../model/busData";
import { Request, Response } from "express";

const BusData = mongoose.model("BusData",busDataSchema)

export const addBusData = async (busData : Object)=>{
    let newData = new BusData({
        busInfo : busData
    })
    await newData.save()
}