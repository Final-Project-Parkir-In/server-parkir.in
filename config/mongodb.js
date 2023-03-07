
const { MongoClient } = require("mongodb");

const connectionString = process.env.URI;

let db = null;

const mongoConnect = async () => {
    const client = new MongoClient(connectionString);

    try {
        const database = client.db("final-project");
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
