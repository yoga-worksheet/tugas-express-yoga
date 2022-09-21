const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.MONGO_URI);

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