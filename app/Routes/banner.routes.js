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

const { findOne } = require('../Models/banner.model.js');
// Banner model
let Banner = require('../Models/banner.model.js');


// POST Banner
router.post('/create-banner', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const banner = new Banner({
        _id: new mongoose.Types.ObjectId(),
        banner_name: req.body.banner_name,
        title: req.body.title,
        product_name: req.body.product_name,
        product_amount_from: req.body.product_amount_from,
        product_description: req.body.product_description,
        avatar: url + '/public/' + req.file.filename,
        status: req.body.status,
    });
    banner.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "Banner registered successfully!",
            bannerCreated: {
                _id: result._id,
                banner_name: result.banner_name,
                title: result.title,
                product_name: result.product_name,
                product_amount_from: result.product_amount_from,
                product_description: result.product_name,
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

// GET All Banners
router.get("/banners", (req, res, next) => {
    Banner.find().then(data => {
        res.status(200).json({
            message: "Banners retrieved successfully!",
            banners: data
        });
    });
});

router.get("/banners", (req, res, next) => {
    Banner.find()
        .then(banners => {
            res.send(banners);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving banners."
            });
        });
});

// get banner by id
router.get('/banners/:bannerId', (req, res) => {
    Banner.findById(req.params.bannerId)
        .then(banner => {
            if (!banner) {
                return res.status(404).send({
                    message: "Banner not found with id " + req.params.bannerId
                });
            }
            res.send(banner);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Banner not found with id " + req.params.bannerId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving banner with id " + req.params.bannerId
            });
        });
});

// delete banner
router.delete('/banners/:bannerId', (req, res) => {
    Banner.findByIdAndRemove(req.params.bannerId)
        .then(banner => {
            if (!banner) {
                return res.status(404).send({
                    message: "Banner not found with id " + req.params.bannerId
                });
            }
            res.send({ message: "Banner deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Banner not found with id " + req.params.bannerId
                });
            }
            return res.status(500).send({
                message: "Could not delete banner with id " + req.params.bannerId
            });
        });
});

// update banner


module.exports = router;