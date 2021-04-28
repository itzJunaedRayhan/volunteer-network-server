const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
require('dotenv').config()
const port = process.env.PORT || 5055;
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.42gqz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/', (req, res) => {
  res.send('Hello World!')
})


client.connect(err => {
  const Eventcollection = client.db("volunteer").collection("events");
//  Get Data From Database
  app.get('/events', (req, res)=>{
    Eventcollection.find()
    .toArray((err, items)=>{
      console.log('from database', items)
      res.send(items)
    })
  })

//  insert Data to Database
  app.post('/addEvent', (req, res)=>{
    const newEvent = req.body;
    console.log('adding new event:', newEvent)
    Eventcollection.insertOne(newEvent)
    .then(result =>{
      console.log('inserted Count', result)
      res.send(result.insertedCount > 0)
    })
  })

});
app.listen(port, () => {
  console.log('Login success')
})