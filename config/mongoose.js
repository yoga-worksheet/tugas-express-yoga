const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind("connection error"));
db.once("open", () => console.log("connected by mongoose..."));
