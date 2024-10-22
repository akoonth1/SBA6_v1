import mongoose from 'mongoose';
import dotenv from 'dotenv';
import error from '../errorhandle.mjs';
dotenv.config();



const connectionString = process.env.databaseURI;


const mongooseDB = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default mongooseDB;


