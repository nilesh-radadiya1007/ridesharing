require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const fileUpload = require("express-fileupload");
const db = require(`./utils/mysql`)


app.use(cors());
app.use(express.static(path.join(__dirname, "Files/Images")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,access_token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// User Module
app.use("/api/v1", routes);


const PORT = (process.env.PORT) ? process.env.PORT : 3001;

db.connect(null, (err) => {
  if (err) {
      process.exit(1)
  } else {
      app.listen(PORT, async () => {
          console.log(`App listening started on port: ${PORT}`);
      })
  }
})

module.exports = app;
