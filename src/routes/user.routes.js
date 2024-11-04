import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js'
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
export default router;