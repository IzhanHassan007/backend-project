import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

// DB se connect hone ka function
const connectDB = async () => {
    try {
        // MongoDB se connect karo
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // Agar connect ho jaye to host ka naam dikhayo
        console.log(`\nMongoDB Connected Successfully !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        // Agar connection mein masla ho to error dikhayo aur process band karo
        console.log("MONGODB Connection Error:", error);
        process.exit(1);
    }
}

export default connectDB;
