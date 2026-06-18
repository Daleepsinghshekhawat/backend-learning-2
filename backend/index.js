const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

const port = 3000;

const url = "mongodb://localhost:27017/userdb";

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));



  const router = require("./route/UserRoutes");
  app.use("/api",router);

  app.listen(port,()=>{console.log(`server runs on port${port}`)})
