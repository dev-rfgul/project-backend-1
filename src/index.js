import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express();



// DB connection 
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error("ERROR :: ", error)
        })
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    } catch (error) {
        console.error("ERROR :: ", error)
        throw error;

    }
})()
//professionally the iife is started with a semicolon to avoid any issues with the previous code