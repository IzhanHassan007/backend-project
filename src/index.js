// Agar dotenv ko require se use karna ho to yeh tareeqa hai
// require('dotenv').config({ path: '/.env' })

import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Env file ko config karo
dotenv.config({
    path: './env'
});

// Database se connect karo
connectDB();





















/*
import express from "express";
const app = express();

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    // Handle Express app errors
    app.on("error", (error) => {
      console.log("APP ERROR:", error);
      throw error;
    });

    // Start server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    // Handle connection errors
    console.error("MONGO CONNECTION ERROR:", error);
    throw error; 
  }
})();

*/

/*Not A Better Approach - 
function connectDB(){};
ConnectDB();*/
