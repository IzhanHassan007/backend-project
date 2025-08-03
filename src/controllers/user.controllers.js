import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        // find userId
        const user = await user.findById(userId)

        // Generate accesstoken and refreshtoken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        // save refreshtoken in db
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        // access token generate
        return {accessToken, refreshToken}
        

    } catch (error) {
        throw new ApiError(500, "Something Went Wrong while generating Access and Refresh Token")
    }
}

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

const registerUser = asyncHandler(async (req, res) => {
    // Step - 1: Get user details from Frontend
    const { fullName, email, username, password } = req.body;
    // console.log("email: ", email);

    // Step - 2: Validation
    if ([fullName, email, username, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    // Step - 3: Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // console.log(req.files);
    

    // Step - 4: Check files for images (avatar)
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Step - 5: Upload images to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }

    // Step - 6: Create user object in DB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });

    // Step - 7: Remove password & refreshToken from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Step - 8: Send Response
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully!")
    );
});


const loginUser = asyncHandler(async(req, res) => {

    // req body sy data ley ao - req body -> data
    // check username or email
    // find the user
    // agr user mil jaye, check password - right or wrong
    // if password check, generate access and refresh token, give to user 
    // send to cookies and response bhejdo

    // Step - 1 req body sy data ley ao 
    const {email, username, password} = req.body

    // Step - 2 check username or email
    if (!username || email) {
        throw new ApiError(400, "Username or email is required !!")
    }

    // Step - 3 Find the user
    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    // agr user nh hoo
    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    // Step - 4 If User Exist, check password - right or wrong
    const isPasswordValid = await user.isPasswordCorrect(password)

    // agr password correct na ho
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    // Step - 5 generate access and refresh token, give to user
    const {accessToken, refreshToken} =  await generateAccessAndRefreshTokens(user._id)

    // Step - 6: cookies set karo
    const LoggedInUser = User.findById(user._id).select("-password refreshToken")

    // cookie options set
    const options = {
        httpOnly: true,
        secure: true
    }

    // response + cookies bhejo
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: LoggedInUser, accessToken, refreshToken
            },
            "User Logged In Successfully !!"
        )
    )

})

// LOGOUT USER
const logoutUser =asyncHandler(async (req, res) => {
    // refresh token hatao
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    // cookie options set
    const options = {
        httpOnly: true,
        secure: true
    }

    // cookies clear + response
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out Successfully !!"))
})

export { 
    registerUser,
    loginUser,
    logoutUser
 };

