

import express from 'express';
import  dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import router from  './routes/foodroute.mjs';
import user_router from './routes/userroute.mjs';
import error from './errorhandle.mjs';
import mongooseDB from './db/mongooseconn.mjs';

//setup
const app = express();

dotenv.config();

let PORT = process.env.PORT || 3002;    

//Connect to the database
mongooseDB();

//Test route
app.get('/test', (req, res) => {
    res.send('Hello World Server');});

//Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes for the main route
app.use('/main',router);
app.use('/users',user_router);




//Seed
// app.get('/seed', async(req, res) => {
//     //await Songs.deleteMany({});
//     //create data
//     await Songs.create(data);
//     res.send('Data seeded');  
// }
// );

//More Middleware for error handling and 404 not found
app.use((req, res, next) => {
    next(error(404, "Resources Not Found"))
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
   // res.render('err404', { message: err.message });
  });
  



// listen to the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);