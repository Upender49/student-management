const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
let collection;
const app = express();
app.use(express.json());
app.use(cors());
const client = new MongoClient("mongodb://127.0.0.1:27017");
async function main() {
  await client.connect();
  console.log("Connetion to mongodb");
  const db = client.db("clgdb");
  collection = db.collection("students");
}
app.listen(2000, () => console.log("Started 2000"));
app.get("/api/users", async (req, res) => {
  const data = await displayData();
  res.json(data);
});
async function displayData() {
  const data = await collection.find().toArray();
//   console.log(typeof data);
  return data;
}
app.post("/api/users", async (req, res) => {
  console.log(req.body);
  const student = {
    ...req.body,
  };
  const result = await collection.insertOne(student);
  res.status(200).json(student);
});
app.delete("/api/users/:id", async (req, res) => {
  const userid = req.params.id;
  const query = { _id: new ObjectId(userid) };
  console.log(userid);
  const result = await collection.deleteOne(query);
//   console.log(result);
  if (result.deletedCount == 1) {
    res.status(200).json({ message: "sucuess" });
  }
  res.status(404).json({ message: "failed" });
});
app.put("/api/users/:id", async (req, res) => {
  const userid = req.params.id;
  
  console.log(req.body)
  console.log(new ObjectId(userid));
  const result = await collection.updateOne({_id: userid}, {$set : req.body});

  console.log(result);

  if (result.mactchedCount === 0) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.status(200).json({ message: "Student updated successfully" });
});

function update() {
  inserdata();
}
main();
