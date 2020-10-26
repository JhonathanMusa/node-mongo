const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const db_name = "EjemploDB2";
const db_collection = "users";

MongoClient.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then((user) => {
    console.log("Database Connected");
    const db = user.db(db_name);
    const userCollection = db.collection(db_collection);

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get("/", (req, res) => {
      res.send("Welcome");
    })

    // Get users
    app.get("/users", (req, res) => {
      userCollection.find({}).toArray((err, result) => {
        if (err) throw err;
        res.status(200).json(result);
      });
    });

    // Get users by Name
    app.get("/user/:id", (req, res) => {
      const id = req.params.id;
      userCollection.find({ _id: id }).toArray((err, result) => {
        if (err) throw err;
        res.status(200).json(result);
      });
    });

    // Insert users

    app.listen(8080);
    console.log("Server running on port 8080");
  })
  .catch((error) => console.error(error));
