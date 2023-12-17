require('dotenv').config();
// eslint-disable-next-line object-curly-spacing
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

module.exports = client;
