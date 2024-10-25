import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    contributor_id: {
        type: Number,
        required: true
    },
    submitted: {
        type: Date,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    nutrition: {
        type: [Number],
        required: true
    },
    n_steps: {
        type: Number,
        required: true
    },
    steps: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    n_ingredients: {
        type: Number,
        required: true
    }
});

recipeSchema.index({ id: 1 }, { unique: true });
recipeSchema.index({ minutes: 1 }, { unique: false });
recipeSchema.index({ n_ingredients: 1 }, { unique: false });

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;