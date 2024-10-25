import express from 'express';
import getReviews from '../controllers/review_controllers.mjs';
import mongoose, { get } from "mongoose";
import dotenv from 'dotenv';



dotenv.config();

const review_router = express();

review_router.get('/testing', (req, res) => {
    res.send('Hello World Review Route');
});

// Create
review_router.post('/create', getReviews.createReview);

// Read
review_router.get('/all', getReviews.getAllReviews);

// Read Review by doc id
review_router.get('/single/:id', getReviews.getReview);

// Read by idNum
review_router.get('/Review_ID/:Review_ID', getReviews.getReviewNum);

// Update by doc id
review_router.put('/update/:id', getReviews.updateReview);

// Update by name
review_router.patch('/update/reviewer_name/:name', getReviews.updateReviewByName);

// Delete by doc id
review_router.delete('/single/:id', getReviews.deleteReview);

export default review_router;
