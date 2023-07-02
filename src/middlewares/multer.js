const path = require('path');
const multer = require('multer');



const multerDiskStorage = multer.diskStorage({

    destination: function(req, file, cb){
            cb(null, path.join(__dirname, '../../public/img'))
        },
    filename: function(req, file, cb){
            let imageName = Date.now()+ '_' +file.originalname;
            cb(null, imageName);
        }
});

const fileUpload = multer ({ storage: multerDiskStorage });




module.exports = fileUpload;