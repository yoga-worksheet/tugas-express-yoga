const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
	`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
);
const db = mongoose.connection;
db.on("error", console.error.bind("connection error"));
db.once("open", () => console.log("connected by mongoose..."));
