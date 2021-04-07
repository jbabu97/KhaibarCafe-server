const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

const port = 4242;
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0qb0p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // breakfast data collection
  const breakfastCollection = client.db("kCafeDb").collection("breakfast");
  console.log("db connected");

  app.post("/addBreakfast", (req, res) => {
    const breakfastFoods = req.body;
    //   console.log(product);
    breakfastCollection.insertMany(breakfastFoods)
    .then((result) => {
      // console.log(result.insertedCount);
      res.send(result.insertedCount > 1);
    });
  });

  app.get("/breakfastFoods", (req, res) => {
    breakfastCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/breakfastFood/:foodId", (req, res) => {
    const foodId = ObjectId(req.params.foodId);
    breakfastCollection.find({ _id: foodId })
    .toArray((err, documents) => {
      res.send(documents[0]);
      // console.log(documents[0]);
    });
  });

  // lunch data collection
  const lunchCollection = client.db("kCafeDb").collection("lunch");

  app.post("/addLunch", (req, res) => {
    const lunchFoods = req.body;
    //   console.log(product);
    lunchCollection.insertMany(lunchFoods)
    .then((result) => {
      // console.log(result.insertedCount);
      res.send(result.insertedCount > 1);
    });
  });

  app.get("/lunchFoods", (req, res) => {
    lunchCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });

    app.get("/lunchFood/:foodId", (req, res) => {
      const foodId = ObjectId(req.params.foodId);
      lunchCollection.find({ _id: foodId })
      .toArray((err, documents) => {
        res.send(documents[0]);
        // console.log(documents[0]);
      });
    });

  });

  // dinner data collection
  const dinnerCollection = client.db("kCafeDb").collection("dinner");

  app.post("/addDinner", (req, res) => {
    const dinnerFoods = req.body;
    //   console.log(product);
    dinnerCollection.insertMany(dinnerFoods)
    .then((result) => {
      // console.log(result.insertedCount);
      res.send(result.insertedCount > 1);
    });
  });

  app.get("/dinnerFoods", (req, res) => {
    dinnerCollection.find({})
    .toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/dinnerFood/:foodId", (req, res) => {
    const foodId = ObjectId(req.params.foodId);
    dinnerCollection.find({ _id: foodId })
    .toArray((err, documents) => {
      res.send(documents[0]);
      // console.log(documents[0]);
    });
  });

  //   client.close();
});

app.get("/", (req, res) => {
  res.send("Hello Khaibar Cafe!");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
