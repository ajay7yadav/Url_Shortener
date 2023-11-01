import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

client.connect().then(()=>{
    console.log("=== DB CONNECTED ===");
}).catch((err)=>{
    console.log(err);
});

const dbName = 'urlShortner';

const dbConnect = client.db(dbName);

const SORTED_URL = dbConnect.collection('sorted_url');

export {
    SORTED_URL
}

