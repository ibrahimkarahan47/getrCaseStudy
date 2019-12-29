const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('dotenv/config');

const endPoint = require('./routes/endPoint');
const app = express();

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true,useUnifiedTopology: true});
const db = mongoose.connection;


if (!db) {
    console.error('Connection to provided MongoDB is failed.')
    return;
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use('/', endPoint);


module.exports = app;