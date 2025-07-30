import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
<<<<<<< HEAD
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
=======
import {upload} from "../middlewares/ulter.middleware.js"

const router = Router()

// file uploading
router.route("/register").post(
    // inject middleware
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
<<<<<<< HEAD
        },
=======
        }, 
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

export default router