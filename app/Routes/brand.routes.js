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

// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5000
    },
    fileFilter: (req, file, cb) => {
        // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        // } else {
        //  cb(null, false);
        //  return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        // }
    }
});

const { findOne } = require('../Models/brand.model.js');
// Brand model
let Brand = require('../Models/brand.model.js');


// POST Brand
router.post('/create-brand', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const brand = new Brand({
        _id: new mongoose.Types.ObjectId(),
        brand_name: req.body.brand_name,
        avatar: url + '/public/' + req.file.filename,
        status: req.body.status,
    });
    brand.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Brand registered successfully!",
            brandCreated: {
                _id: result._id,
                brand_name: result.brand_name,
                avatar: result.avatar,
                status: req.body.status,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})

// GET All Brands
router.get("/brands", (req, res, next) => {
    Brand.find().then(data => {
        res.status(200).json({
            message: "Brands retrieved successfully!",
            brands: data
        });
    });
});

router.get("/brands", (req, res, next) => {
    Brand.find()
        .then(brands => {
            res.send(brands);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving brands."
            });
        });
});

// get brand by id
router.get('/brands/:brandId', (req, res) => {
    Brand.findById(req.params.brandId)
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            res.send(brand);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving brand with id " + req.params.brandId
            });
        });
});

// delete brand
router.delete('/brands/:brandId', (req, res) => {
    Brand.findByIdAndRemove(req.params.brandId)
        .then(brand => {
            if (!brand) {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            res.send({ message: "Brand deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Brand not found with id " + req.params.brandId
                });
            }
            return res.status(500).send({
                message: "Could not delete brand with id " + req.params.brandId
            });
        });
});

// update brand


module.exports = router;