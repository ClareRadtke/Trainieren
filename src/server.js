const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;
const apiRoutes = require("./routes/api");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3333;

//Mongoose connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trainieren", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => console.error(error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(routes);
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
