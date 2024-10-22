import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import db  from "../db/conn.mjs";


// Initialize dotenv to use environment variables
dotenv.config();

const router = express.Router();

// Middleware to parse request bodies
router.use(bodyParser.json());

// Define a simple route
router.get("/test", (req, res) => {
    res.send("Hello World Food Route");
});

// Define a route to get all food items
router.get("/food", async (req, res) => {
    let food = await db.collection("Recipes").find().limit(10).toArray();
    res.json(food);
});

export default router;