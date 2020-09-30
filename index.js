const express = require('express');
const bodyParser = require('body-parser');

const password = '7tk93l4yEI9dWFL2';

// ---------------------------------------------------------------- version 2.2.12

const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID; // id dhore delete korar jonno

const uri = "mongodb://jm-module-48:7tk93l4yEI9dWFL2@cluster0-shard-00-00.opwzi.mongodb.net:27017,cluster0-shard-00-01.opwzi.mongodb.net:27017,cluster0-shard-00-02.opwzi.mongodb.net:27017/organicdb?ssl=true&replicaSet=atlas-t6aucd-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// ----------------------------------------------------------------
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // form k properly parse korar jonno


app.get('/', (req, res) => {
    console.log('I am working on IDE console');
    // res.send('I am working on local host');
    res.sendFile(__dirname + '/index.html');
})



// ---------------------------------------------------------------- new connect


client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");

    // perform actions on the collection object
    console.log('database connected');


    // ---------------------------------------------------------------- below Add product into database
    app.post("/addProduct", (req, res) => {
        const product = req.body;
        console.log(product);

        productCollection.insertOne(product)
            .then(() => {
                console.log('Data added successfully');
                res.send('success');
            })
    })



    // ---------------------------------------------------------------- below READ from database
    app.get('/products', (req, res) => {
        console.log('I am in products - IDE console');
        // res.send('I am in products - localhost');

        productCollection.find({})
            .toArray((err, docs) => {
                res.send(docs);
            })
    })


    // ---------------------------------------------------------------- below DELETE from database
    app.delete('/delete/:id', (req, res) => {
        console.log(req.params);
        productCollection.deleteOne({
            _id: ObjectID(req.params.id)
        }).then(res => {
            console.log(res);
        })
    })


    // ---------------------------------------------------------------- below Update a single product in database

    // first LOAD a single product
    app.get('/product/:id', (req, res) => {
        productCollection.find({ _id: ObjectID(req.params.id) })
            .toArray ((err,docs) => {
                res.send(docs[0]);
            })
    })


    // UPDATE that product
    app.patch('/update/:id', (req, res) => {
        console.log(req.body.price);
        productCollection.updateOne(
            { _id: ObjectID(req.params.id)},
            {
                $set : {
                    price: req.body.price,
                    quantity: req.body.quantity
                }
            }
        ) 
        .then(result => {
            console.log(result)
        })
    })

});








app.listen(3000);