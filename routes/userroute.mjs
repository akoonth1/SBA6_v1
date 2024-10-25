import express from 'express';
import getUsers from '../controllers/user_controllers.mjs';
import mongoose, { get } from "mongoose";
import dotenv from 'dotenv';
import User from '../models/user_schema.mjs';
import router from './foodroute.mjs';
import error from "../errorhandle.mjs";


dotenv.config();


const user_router = express();


user_router.get('/testing', (req, res) => {
    res.send('Hello World User Route');
});

//Create

user_router.post('/create', getUsers.createUser);

//Read
user_router.get('/all', getUsers.getAllUsers);

//Read USer by doc id
user_router.get('/single/:id', getUsers.getUser);



//Read by idNum
user_router.get('/idnum/:idNum', getUsers.getUserNum);



// Update by doc id
user_router.put('/update/:id', getUsers.updateUser);


// Update by name
user_router.put('/update/name/:name', getUsers.updateUserByName);


// Delete by doc id
user_router.delete('/single/:id', getUsers.deleteUser);



export default user_router;
