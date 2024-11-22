const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const excelRoute = require("./routes/excelRoute");
const app = express();
var cors = require('cors')
app.use(cors())

app.use(morgan("dev"));
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message: "hello, i'm server ",
  });
  console.log("Hello World");
});

app.use("/excelproduct", excelRoute);

const PORT = process.env.PORT || 7000 || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgCyan.white);
});
