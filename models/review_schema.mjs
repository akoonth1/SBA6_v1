import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    Review_ID: {
        type: Number,
        required: true,
        unique: true
    },
    recipe_name: {
        type: String,
        required: true
    },
    cook_time: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewer_name: {
        type: String,
        required: true
    },
    review_date: {
        type: Date,
        required: true
    },
    helpful_votes: {
        type: Number,
        required: true
    },
    Review: {
        type: String,
        required: true
    }
});


const Review = mongoose.model('Review', reviewSchema);

reviewSchema.index({ Review_ID: 1 }, { unique: true });

export default Review;