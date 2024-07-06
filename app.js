const express = require("express");
const mongoose = require("mongoose");
const adminRoute = require("./routes/admin.Routes.js");
const bodyParser = require("body-parser");
const path = require("path");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/",adminRoute);



app.listen(2000, () => console.log("Server started on port 2000"));