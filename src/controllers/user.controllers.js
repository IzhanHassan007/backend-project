import { asyncHandler } from "../utils/asyncHandler.js";
<<<<<<< HEAD
import {apiError, ApiError} from "../utils/apiError.js"
=======
import {apiError, ApiError} from "../utils/apiError.js";
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
<<<<<<< HEAD
    // TO REGISTER USER

    // get user details from Front-End
    // Validation (empty, wrong or incorrect syntax)
    // check if user already exists: username - email
    // check for images and avatar
    // if available, upload them on cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation or null
    // if user create, return response or error

    // Step - 1 = get user details from Front-End
    const { fullName, email, username, password } = req.body
    console.log("email: ", email);

    // Step - 2 = Validation (empty, wrong or incorrect syntax)
    // if (fullName === "") {
    //     throw new apiError(400, "Fullname is Required !!")
    // }
 
    if (
        [fullName, email, username. password].some((field) => 
        field?.trim() === "")
    ) {
        throw new apiError(400, "All field are required !!")
    }

    // Step - 3 check if user already exists: username - email
=======

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
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
<<<<<<< HEAD
        throw new apiError(409, "User with email & username already exist")
    }
    
    // Step - 4 check for images and avatar
=======
        throw new ApiError(409, "User with Email or Username Already Exist")
    }

    // Step - 4 check files for images, avatar
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
<<<<<<< HEAD
        throw new apiError(400, "Avatar file is Required")
    }

    // Step - 5 if available, upload them on cloudinary, avatar
=======
        throw new apiError(400, "Avatar File is required")
    }

    // Step - 5 upload them to Cloudinary, avatar
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
<<<<<<< HEAD
        throw new apiError(400, "Avatar file is Required")
    }

    // Step - 6 create user object - create entry in db
=======
        throw new apiError(400, "Avatar File is required")
    }

    // Step - 6 create user Object - create entry in db
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
<<<<<<< HEAD
        username: username.toLowerCase()
    })

    // Step - 8 check for user creation or null
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new apiError(500, "Somwthing Went Wrong While Registering a User")
    }
    
    // Step - 9 if user create, return response or error
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully")
    )
=======
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
>>>>>>> a34d4e1020d85347497fb098487dbf771a8f1bf5

} )

export {registerUser}