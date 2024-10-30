import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from "../utils/ApiError.js"
import { User } from '../models/user.model.js'


const registerUser = asyncHandler(async (req, res) => {

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

    const existed User = User.findOne({
        // we can pass the value on which we want to find one which can be username or email but when we have to find by both like email and username shoudl  be unique in that case we can follow this approach
        $or: [{ username }, { email }]
        // and we can pass on as many objects as we want 
    })
    if(existedUser){
        throw new ApiError(409, "user with this email or username already exists")
    }

})

export { registerUser } 