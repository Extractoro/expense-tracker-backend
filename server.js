require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongodbUrl = process.env.DATABASE_URL;
const routes = require("./src/routes/routes");

mongoose.connect(mongodbUrl, { dbName: "userdata" });
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});
const app = express();

app.use(express.json());
app.use("/data", routes);

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
