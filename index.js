const {MongoClient} = require('mongodb');
const express = require('express');
const cors = require('cors');
let collection ;
const app = express();
app.use(express.json())
app.use(cors())
const client = new MongoClient('mongodb://127.0.0.1:27017');
async function main() {
    await client.connect();
    console.log("Connetion to mongodb");
    const db = client.db("clgdb");
    collection = db.collection('students');
    
    
    
}
app.listen(2000,()=>console.log('Started 2000'));
app.get('/api/users',async (req,res)=>{
    const data = await displayData()
    res.json(data);
})
async function displayData(){
    const data = await collection.find().toArray();
    console.log(typeof data);
    return data;
    

}
app.post('/api/users',async (req,res)=>{
    console.log(req.body);
    const student ={
        ...req.body
    }
    const result = await collection.insertOne(student);
    res.status(200).json(student)
})

function update(){
    inserdata();

}
main();

