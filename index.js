require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');

const onboardRoute = require('./routes/onBoard.route')

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/test', onboardRoute)

app.get("/temp", (req, res) => {
  res.send("Fine ");
});

const PORT = 9010
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
