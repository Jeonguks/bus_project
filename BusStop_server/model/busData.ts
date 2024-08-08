import mongoose from "mongoose";

const Schema = mongoose.Schema

export const busDataSchema = new Schema({
    busInfo:{
        type: Object,
        required: true
    },
    time:{
        type: Date,
        default: Date.now
    }
})