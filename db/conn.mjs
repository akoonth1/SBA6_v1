
//import { MongoClient } from 'mongodb';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectionStr = process.env.databaseURI;


const client = new MongoClient(connectionStr);

let conn;

try {
    conn = await client.connect();
    console.log("Connected to the database");
} catch (err) {
    console.log(err);
}

let db = conn.db("Food_recipe");


export default db;