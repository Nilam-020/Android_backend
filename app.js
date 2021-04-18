const express = require('express');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const connectDB = require('./database/db')
const colors = require("colors");
const cors = require('cors')


const userRoute = require('./routes/userRoute');
const appointmentRoute = require('./routes/appointmentRoute');
const staffRoute = require('./routes/staffRoute');
const doctorRoute = require('./routes/DoctorRoute')

const instanceRouter = require('./routes/appointmentInstanceRoute');
app.use(express.json());

// Connect to mongoDB database
app.use(cors());
app.use(userRoute);
app.use(appointmentRoute);
app.use(staffRoute);
app.use(doctorRoute);
app.use(instanceRouter);

dotenv.config({
    path: "./config/config.env",
});

const PORT = process.env.PORT || 3000;

const server = app.listen(
    PORT,
    console.log(
        `Server running in mode : ${process.env.NODE_ENV},on port : ${PORT}`.yellow.bold
    )
);