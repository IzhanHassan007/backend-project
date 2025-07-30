import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError, ApiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => {
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
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if (existedUser) {
        throw new apiError(409, "User with email & username already exist")
    }
    
    // Step - 4 check for images and avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar file is Required")
    }

    // Step - 5 if available, upload them on cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new apiError(400, "Avatar file is Required")
    }

    // Step - 6 create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
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

} )

export {registerUser}