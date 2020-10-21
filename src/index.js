const express = require("express");
const app = express();
const Mongodb = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const db_name = "EjemploDB2";

Mongodb.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((user) => {
    console.log("Database Connected");
    const db = user.db(db_name);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(require("./routes/index"))

    app.listen(8080);
    console.log("Server running on port 8080");
  })
  .catch((error) => console.error(error));
