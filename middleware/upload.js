const multer = require('multer');

const fileFilter = ((req, file, cb) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
})


const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, './images')
    }),
    filename: ((req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    })
})
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
module.exports = upload;