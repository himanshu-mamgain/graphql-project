const { MongoClient } = require("mongodb");
const config = require('../../config/config.json');

const mongoURL = config.mongoDB.url;
const dbName = config.mongoDB.dbName;

const client = new MongoClient(mongoURL);

function mongoDBConnection() {
    try {
        return client.db(dbName);
    } catch(err) {
        throw err?.message;
    }
};

module.exports.mongoDBConnection = mongoDBConnection;