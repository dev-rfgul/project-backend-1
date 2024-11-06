import { Router } from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
} from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();


router.route("/register").post(
    // we are using fields bcoz we need to handle multiple files if we had to upload only a single file we can use single instead of field
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
router.route("/login").post(loginUser)

//secure route
//verify jwt is a middlware and this is how we inject the middleware 
router.route("/logout").post(verifyJwt, logoutUser)
router.route("refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJwt, changeCurrentPassword)
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/update-account").patch(verifyJwt, updateAccountDetails)
router.route("/avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage)
router.route("/history").get(verifyJwt, getWatchHistory)
//all the above data was coming and going through req.body but the following one is coming from params so its wrote differently
router.route("/c/:username").get(verifyJwt, getUserChannelProfile)
export default router;