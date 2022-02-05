import { MongoClient } from 'mongodb';
const uri = process.env.URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log("Mongodb connected")
    //client.close();
});
