import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import error from "../errorhandle.mjs";
import dotenv from 'dotenv';
import Review from "../models/review_schema.mjs";






//Create a Review


async function createReview(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let newReview = new Review(req.body);
        await newReview.save();
        res.json(newReview);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}


//Read by Review_ID
async function getReviewNum(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let oneReview = await Review.findOne({ Review_ID: req.params.Review_ID});
        if (!oneReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(oneReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Get a single Review
async function getReview(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let oneReview= await Reviews.findOne(query);
        if (!oneReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(oneReview);
    } catch (err) {
        res.status(500).json({ message: "failed to get Review" });
    }
}


// Get all Reviews
async function getAllReviews(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let allReviews = await Reviews.find({}).toArray();
        res.json(allReviews);

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve Reviews',
            error: err.message
        });
    }
}

//Update Review
async function updateReview(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let updateReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updateReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Update Review by name

async function updateReviewByName(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let updateReview = await Review.findOneAndUpdate(
            { reviewer_name: req.params.name },
            req.body,
            //{ new: true }
        );
        if (!updateReview) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.json(updateReview);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



//Delete a Review
async function deleteReview(req, res) {
    let Reviews = db.collection("reviews");
    try {
        let deleteOneReviews = await Review.findByIdAndDelete(req.params.id);
        if (!deleteOneReviews) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.json(deleteOneReviews);
   
    } catch (err) {
        res.status(500).json({ error: err });
    }

}






export default {getReview, getAllReviews, createReview, deleteReview, updateReview, updateReviewByName, getReviewNum};



