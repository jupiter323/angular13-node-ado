const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));
app.use(express.json());  /* bodyParser.json() is deprecated */

app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

app.get("/", (req, res) => {
  res.json({ message: "Welcome to erichufnagle application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
