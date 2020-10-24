//get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(cors());

// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));

const Role = require('./app/Models/role.model.js');

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./app/config/config.js');
const mongoose = require('mongoose');

// Required Routes
require('./app/Routes/category.routes.js')(app);
require('./app/Routes/product.routes.js')(app);
require('./app/Routes/customer.routes.js')(app);
require('./app/Routes/customerGroup.routes.js')(app);
require('./app/Routes/order.routes.js')(app);
require('./app/Routes/role.routes.js')(app);
// user routes
require("./app/Routes/auth.routes.js")(app);
require("./app/Routes/user.routes.js")(app);


// Routes to Handle Request
const brandRoute = require('./app/Routes/brand.routes.js');
const productFileRoute = require('./app/Routes/product-file.routes.js')


// API Route
app.use('/', brandRoute);
app.use('/', productFileRoute)

// Make Images "Uploads" Folder Publicly Available
app.use('/public', express.static('public'));

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connected to the database");
    initial();
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({ "message": "tapnicdigital.co.zw" });
});

// listen on port environment port
// app.listen(process.env.PORT, () => {
//     console.log("Server is listening on port 3000");
// });
// listen on port environment port or port 3000
app.listen(config.serverport, () => {
    console.log(`Server is running on port ${config.serverport}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}