// ye sirf verify kry ga k user h ya nh

import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // 1. Token cookies ya headers sy lo
        let token = req.cookies?.accessToken || req.header("Authorization");
        console.log("Authorization Header:", req.header("Authorization"));
        console.log("Cookies Token:", req.cookies?.accessToken);

        // 2. Bearer token format handle karo
        if (token && token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
        } 
        // agr token nh mila
        if (!token) {
            throw new ApiError(401, "Unauthorized Request !! ")
        }
    
        // token verify karo
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken?._id) throw new ApiError(401, "Invalid token payload!");

    
        // user find karo
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        // agr user nh mila
        if (!user) {
            throw new ApiError(401, "User not found for this token! ")
        }
    
        // user req me save
        req.user = user;
        next() // next middleware
    } catch (error) {
         console.error("JWT Verify Error:", error.message);
        
         if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token expired! Please login again.");
        }
        
        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Malformed token!");
        }

        // invalid token error
        throw new ApiError(401, "Invalid Access Token")
    }
})
