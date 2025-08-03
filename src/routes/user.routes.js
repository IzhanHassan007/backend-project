import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"; // file upload middleware
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// register route + file upload
router.route("/register").post(
    upload.fields([
        {
            name: "avatar", // avatar image
            maxCount: 1
        },
        {
            name: "coverImage", // cover image
            maxCount: 1
        }
    ]),
    registerUser // user register
);

// login route
router.route("/login").post(loginUser)

// logout (secure route)
router.route("/logout").post(verifyJWT, logoutUser)

export default router; // router export
