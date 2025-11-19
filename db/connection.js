require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let _db;

const initDb = async (callback) => {
    if (_db) {
        console.log("Db was initailized previously");
        return callback(null, _db);
    }
        await client.connect()
        .then((client) =>{
            _db=client;
            callback(null, _db);
            console.log("Connected to MongoDB");
        })
        .catch((err) => {callback(err);
        throw Error("Connection to MongoDB failed", err);
        });
    };

        const getDb = () => {
            if (!_db) {
                throw Error("Db not initialized");
            }
            return _db;
        };

        module.exports = {
            initDb,
            getDb
    };