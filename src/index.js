//we need to load the env file first as it holds the urls keys and passwords.this is one apprroach of doing it and the other is to use the dotenv package but after importing we need to configure it as well
// require("dotenv").config({path:'./env'});
import express from 'express'
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";


dotenv.config({ path: "./env" });

connectDB()
    .then(
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    )
    .catch((error) => {
        console.error("DB connection failed", error);
        process.exit(1);
    })
























/* unprofessional approach for connecting DB.
// DB connection 
import express from "express";
const app = express();

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

*/