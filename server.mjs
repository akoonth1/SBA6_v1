

import express from 'express';
import  dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ObjectId } from 'mongodb';
import { MongoClient } from 'mongodb';
import router from  './routes/foodroute.mjs';
import user_router from './routes/userroute.mjs';
import error from './errorhandle.mjs';
import mongooseDB from './db/mongooseconn.mjs';
import userMockData from './data/user_mock_data.mjs'; // Adjust the path as necessary
import User from './models/user_schema.mjs'; // Adjust the path as necessary
import Review from './models/review_schema.mjs';
import Mock_review_data from './data/Mock_review_data.mjs';
import review_router from './routes/reviewroute.mjs';



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
app.use('/reviews',review_router);





//Seed user data
// app.get('/seed/users', async(req, res) => {
//     try {
//         // Uncomment the following line if you want to delete existing data
//         // await User.deleteMany({});
        
//         // Create data
//         await User.create(userMockData);
//         res.send('Data seeded');
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


//Seed review data  
//Validation rule will partially stop the upload of all data based on duplicate review_IDs
//This is show show enforcement of validation rules

app.get('/seed/reviews', async(req, res) => {
    try {
        // Uncomment the following line if you want to delete existing data
        // await Review.deleteMany({});
        
        // Create data
        await Review.create(Mock_review_data);
        res.send('Data seeded');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



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