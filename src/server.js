const express = require("express");
const mongoose = require("mongoose");
const mongoDB =
  "mongodb+srv://trainieren-data.xb3hn.mongodb.net/Trainieren-data";
const routes = require("../public/js/api");

const app = express();
const PORT = process.env.PORT || 3333;

//Mongoose connection
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useFindAndModify: false,
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => console.error(error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("../public/"));
// app.use(routes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
