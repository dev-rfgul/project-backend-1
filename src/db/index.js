import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongo DB connected to ${connectionInstance.connection.host} \n`)
    } catch (error) {
        console.log("Mongo DB connection failed :: ", error)
        process.exit(1);

    }
};

export default connectDB;