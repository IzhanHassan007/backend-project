import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Express app banao
const app = express();

/* 
✅ 1) CORS Configuration
Ye zaroori hai jab tumhara frontend (React, Next.js waghera) aur backend alag ports pe chal rahe hon.
- origin: kahan se request accept karni hai
- credentials: true ka matlab cookies aur headers bhi allow hon
*/
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

/* 
✅ 2) Body Parser Configuration
Express ko batao ke request body mein JSON ya form data kitna bara ho sakta hai.
- JSON data limit: 16kb tak ki body allow hai.
- URL Encoded data limit: Form se ane wale data ko bhi parse kar sake.
*/
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

/*
✅ 3) Static Files Configuration
Public folder se static files serve karne ke liye.
Jaise HTML, CSS, images ya uploads direct browser se access ho sakein.
*/
app.use(express.static("public"));

// Cookies ko parse karo
app.use(cookieParser());

// App ko export karo taake server.js ya index.js mein use ho sake
export { app };
