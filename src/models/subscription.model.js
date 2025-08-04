import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    Subscriber:{
        type: Schema.Types.ObjectId,    // one who is Subscribing
        ref: "User"
    },
    channel:{
        type: Schema.Types.ObjectId,    // to whome Subscriber is Subscribing
        ref: "User"
    }
}, {timestamps: true})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)


