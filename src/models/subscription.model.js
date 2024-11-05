import mongoose, { Schema } from "mongoose"


const subscriptionSchema = new Schema({
    //this is the one who is subscribing 
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    //one to whom the subscriber is subscribing
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timeStapms: true })


export const subscription = mongoose.model("Subscription", subscriptionSchema)