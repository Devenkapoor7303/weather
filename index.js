const express = require("express");
const dotenv = require("dotenv");
const weatherRouter = require('./Routes/weatherRoute');
const {globalErrorHandle} = require('./middlewares/globalError');
const path =require("path");

require('express-async-errors');

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());

app.use("/api/v1" , weatherRouter);

app.use(globalErrorHandle);

app.use("*", (req, res) => {
    res.status(400).json({
      msg: "Route Not Found",
    });
});

app.listen(5100, () => {
   console.log("server started");
});
