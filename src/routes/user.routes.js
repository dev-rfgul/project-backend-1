import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js'
import {upload} from '../middlewares/multer.middlewares.js'
const router = Router();


router.route("/register").post(
    // we are using fields bcoz we need to handle multiple files if we had to upload only a single file we can use single instead of field
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)
export default router;