const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "latihan";
let db;
let collection;

const main = async () => {
  await client.connect();
  console.log("Connected successfully to server");
  db = client.db(dbName);
  collection = db.collection("users");

  return "done";
};

main();

// Create User
app.post("/createUser", async (req, res) => {
  try {
    await collection.insertOne({ name: req.body.name, age: req.body.age, status: req.body.status });
    res.json({ message: "berhasil memasukkan data user" });
  } catch (error) {
    console.log(error);
  }
});

// Read Users
app.get("/", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    res.json({ findResult });
  } catch (error) {
    console.log(error);
  }
});

// Update User berdasarkan id
app.patch("/updateUser/:id", async (req, res) => {
  try {
    await collection.updateOne({ _id: new ObjectId(`${req.params.id}`) }, { $set: { name: req.body.name, age: parseInt(req.body.age), status: req.body.status } });

    res.json({ message: `berhasil update document dengan id: ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
});

// Delete User berdasarkan id
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await collection.deleteOne({ _id: new ObjectId(`${req.params.id}`) });
    res.json({ message: `berhasil hapus document dengan id: ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
