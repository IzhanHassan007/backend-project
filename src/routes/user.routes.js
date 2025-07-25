import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from "../middlewares/ulter.middleware.js"

const router = Router()

// file uploading
router.route("/register").post(
    // inject middleware
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

export default router