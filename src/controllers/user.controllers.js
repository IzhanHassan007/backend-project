import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError, ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => {

    // Get user details from Front-End (from Controllers - name, fullName)
    // validation (user ny email empty to nh bheja, correct format)
    // check user already exist: username or email
    // check files for images, avatar
    // upload them to Cloudinary, avatar
    // create user Object - create entry in db
    // remove password & refresh token from response
    // check for user creation 
    // return response || Error

    // Step - 1 Get user details from Front-End (from Controllers - name, fullName)
    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    // Step - 2 validation (user ny email empty to nh bheja, correct format)
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new apiError(400, "All fields are required")
    }

    // Amother Way....
    // if (fullName === "") {
    //         throw new ApiError(400, "Fullname is Required")
    // }

    // Step - 3 check user already exist: username or email
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new ApiError(409, "User with Email or Username Already Exist")
    }

    // Step - 4 check files for images, avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar File is required")
    }

    // Step - 5 upload them to Cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new apiError(400, "Avatar File is required")
    }

    // Step - 6 create user Object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase() 
    })

    // Step - 7 remove password & refresh token from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // Step - 8 check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering a user")
    }

    // Step - 9 return response || Error
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registerd Successfully !!")
    ) 

} )

export {registerUser}