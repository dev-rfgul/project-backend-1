import multer from 'multer'

const storage = multer.diskstorage({
    destination: function (req, res, cb) {
        sb(null, './public/temp')
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