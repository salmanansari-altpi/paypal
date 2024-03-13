require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const App = express();
App.use(bodyParser.json());
App.post("/Getdata", (req, res) => {
  console.log(req);
  res.send("An");
});

App.get("/temp", (req, res) => {
  res.send("Fine ");
});

App.listen(process.env.port);
