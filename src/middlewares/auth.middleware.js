// ye sirf verify kry ga k user h ya nh

import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        // token cookies/headers sy lo
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        // agr token nh mila
        if (!token) {
            throw new ApiError(401, "Unauthorized Request !! ")
        }
    
        // token verify karo
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // user find karo
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        // agr user nh mila
        if (!user) {
            throw new ApiError(401, "Invalid Access Token !! ")
        }
    
        // user req me save
        req.user = user;
        next() // next middleware
    } catch (error) {
        // invalid token error
        throw new ApiError(401, "Invalid Access Token")
    }
})
