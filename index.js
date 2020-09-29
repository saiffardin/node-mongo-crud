const express = require('express');
const password = '7tk93l4yEI9dWFL2';

// ---------------------------------------------------------------- version 2.2.12

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://jm-module-48:7tk93l4yEI9dWFL2@cluster0-shard-00-00.opwzi.mongodb.net:27017,cluster0-shard-00-01.opwzi.mongodb.net:27017,cluster0-shard-00-02.opwzi.mongodb.net:27017/organicdb?ssl=true&replicaSet=atlas-t6aucd-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// ----------------------------------------------------------------
const app = express();

app.get('/', (req, res) => {
    console.log('I am working on IDE console');
    res.send('I am working on local host');
})

// ---------------------------------------------------------------- new connect

client.connect(err => {
    const collection = client.db("organicdb").collection("products");

    // perform actions on the collection object
    console.log('database connected');

    const product = { name: "honey", price: 25, quantity: 40 };

    collection.insertOne(product)
        .then(() => {
            console.log('product added successfully.');
        })


    // client.close();
});

// ---------------------------------------------------------------- add a single product






app.listen(3000);