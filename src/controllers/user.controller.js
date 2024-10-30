import {asyncHandler} from '../utils/asyncHandler.js'


const registerUser = asyncHandler(async (req, res) => {
    console.log("registerdUser called")
    res.status(200).json({
        message: "Ok"
    })
})

export { registerUser } 