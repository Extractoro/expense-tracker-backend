require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongodbUrl = process.env.DATABASE_URL;
const routes = require("./src/routes/routes");

mongoose.connect(mongodbUrl);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use("/data", routes);
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});