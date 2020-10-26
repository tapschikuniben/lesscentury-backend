let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

// Multer File upload settings
const DIR = './public/';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


var upload = multer({
    storage: storage,
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// ProductFile model
let ProductFile = require('../Models/productfile.model.js');


router.post('/createProductFile', upload.array('avatar', 6), (req, res, next) => {
    const reqFiles = []
    const url = req.protocol + '://' + req.get('host')
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(url + '/public/' + req.files[i].filename)
    }


    const productFile = new ProductFile({
        _id: new mongoose.Types.ObjectId(),
        avatar: reqFiles,
        created_by: req.body.created_by,
        modified_by: req.body.modified_by,
        product_id: req.body.product_id,
        product_name: req.body.product_name,
        product_amount: req.body.product_amount,
    });
    productFile.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Done upload!",
            productFileCreated: {
                _id: result._id,
                avatar: result.avatar,
                created_by: req.body.created_by,
                modified_by: req.body.modified_by,
                product_id: req.body.product_id,
                product_name: req.body.product_name,
                product_amount: req.body.product_amount,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})


router.get("/productFiles", (req, res, next) => {
    ProductFile.find().then(data => {
        res.status(200).json({
            message: "ProductFile list retrieved successfully!",
            productFiles: data
        });
    });
});


module.exports = router;