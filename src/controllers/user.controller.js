import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.model.js'
import { cloudinary, uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req, res) => {

    // algorithm 
    //get user details from frontend 
    // validation - not empty
    // check if the user user is already registered -email / username
    // check for images check for avatar
    // upload it to cloudinary,avatar
    // create user object create entry in DB
    // remove password and refresh token field from response
    //check for user creation
    // retrun response
    const { username, fullName, email, password } = req.body
    console.log("email ", email)
    console.log("password ", password)

    // we can chceck all the fields by using alot of if else nothing wrong in this but we can use another approach starting from line 24
    // if (fullName === "") {
    //     throw new ApiError(400, "Full Name is required")
    // }
    if (
        // in this line we are taking an array which will have all the values and using some function on it which will return true or false after that we are triming the fields and even then if any field is empty it will return true 
        [fullName, email, password, username].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        // we can pass the value on which we want to find one which can be username or email but when we have to find by both like email and username shoudl  be unique in that case we can follow this approach
        $or: [{ username }, { email }]
        // and we can pass on as many objects as we want 
    })
    if (existedUser) {
        throw new ApiError(409, "user with this email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.cover[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create({
        fullName,
        email,
        username,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        username: username.toLowerCase()
    })
    // to verify wether the user has been created we can use find methord and find user by _id like this
    // const createdUer = await User.findById(user._id) 

    //in the following we had just verified wether the user has been created and we are removing the password and its refresh token this is a bit weird syntax of .select methord and in this we have to pass on the values we dont want to include with a -sign and by defualt everything is selected.
    const createdUer = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})

export { registerUser } 