const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

const uri = process.env.MODEL_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(()=>console.log('db connected'));


const app = express();

app.listen(4000)