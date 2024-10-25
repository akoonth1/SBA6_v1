import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import error from "../errorhandle.mjs";
import dotenv from 'dotenv';
import User from "../models/user_schema.mjs";






//Create a user


async function createUser(req, res) {
    let Users = db.collection("users");
    try {
        let newUser = new User(req.body);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


//Read by idNum
async function getUserNum(req, res) {
    let Users = db.collection("users");
    try {
        let oneUser = await User.findOne({ idNum: req.params.idNum });
        if (!oneUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(oneUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Get a single user
async function getUser(req, res) {
    let Users = db.collection("users");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let oneUser= await Users.findOne(query);
        if (!oneUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(oneUser);
    } catch (err) {
        res.status(500).json({ message: "failed to get user" });
    }
}


// Get all users
async function getAllUsers(req, res) {
    let Users = db.collection("users");
    try {
        let allUsers = await Users.find({}).toArray();
        res.json(allUsers);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve users',
            error: err.message
        });
    }
}

//Update User
async function updateUser(req, res) {
    let Users = db.collection("users");
    try {
        let updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Update User by name

async function updateUserByName(req, res) {
    let Users = db.collection("users");
    try {
        let updateUser = await User.findOneAndUpdate(
            { name: req.params.name },
            req.body,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Delete a user
async function deleteUser(req, res) {
    let Users = db.collection("users");
    try {
        let deleteOneUsers = await User.findByIdAndDelete(req.params.id);
        if (!deleteOneUsers) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(deleteOneUsers);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

}






export default {getUser, getAllUsers, createUser, deleteUser, updateUser, updateUserByName, getUserNum};



