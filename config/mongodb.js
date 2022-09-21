const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}?authSource=admin`;
const client = new MongoClient(uri);

(async () => {
    try {
        await client.connect();
        console.log('connected by mongodb driver...');
    } catch (error) {
        console.log('connection error')
    }
})();

const db = client.db(process.env.DB_NAME);
module.exports = db;