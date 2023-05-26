const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require("path") // deploy only


// config
dotenv.config({ path: "config/config.env" })


app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload());
// app.use(express.static(path.join(__dirname, "client", 'build')))    // deploy only

// app.use('/', async (req, res) => {
//    res.sendFile(path.join(__dirname, "client", 'build', 'index.html'))  // deploy only
// });



// route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", order)
app.use("/api/v1", payment)


// Middleware for error
app.use(errorMiddleware)

module.exports = app;