require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const onboardRoute = require('./routes/onBoard.route')

const App = express();
App.use(express.urlencoded({ extended: false }))
App.use(bodyParser.json());

App.use('/test', onboardRoute)

App.post("/Getdata", (req, res) => {
  console.log(req);
  res.send("An");
});

App.get("/temp", (req, res) => {
  res.send("Fine ");
});

const PORT = process.env.port
App.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
