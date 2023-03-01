const { MongoClient } = require('mongodb')
const connectionString = "mongodb://0.0.0.0:27017";

let db

const mongoConnect = async () => {
    const client = new MongoClient(connectionString);

    try {
        const database = client.db("users");

        db = database;
        return database;
    } catch (err) {
        await client.close();
    }
};

const getDatabase = () => db;

module.exports = {
    mongoConnect,
    getDatabase,
};