import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // this is used to generate a unique name for the file
        // const uniqueSuffix = Date.now()'-' + Math.Round
        //     (Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export const upload = multer({
        storage,
    })