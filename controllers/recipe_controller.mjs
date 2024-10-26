import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import db  from "../db/conn.mjs";
// Initialize dotenv to use environment variables
dotenv.config();



async function getRecipesall(req, res) {
    let food = await db.collection("recipes").find().limit(10).toArray();
    res.json(food);
}


async function getRecipeID(req, res) {
    let food = db.collection("recipes");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let oneFood = await food.findOne(query);
        if (!oneFood) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(oneFood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function SingleFix(req, res) {
    let food = db.collection("recipes");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let pipeline = [
            { $match: query },
            {
                '$set': {
                  'ingredients': {
                    '$map': {
                      'input': {
                        '$split': [
                          '$ingredients', ','
                        ]
                      }, 
                      'as': 'ingredient', 
                      'in': {
                        '$trim': {
                          'input': '$$ingredient', 
                          'chars': ' \'[]'
                        }
                      }
                    }
                  }
                }
              }
        ];
        let oneFood = await food.aggregate(pipeline).toArray();
        if (oneFood.length === 0) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(oneFood[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function SearchByMin(req, res) {
    let food = db.collection("recipes");
    try {
        let query = { minutes: { $lte: parseInt(req.params.minutes) } };
        let foodByMinutes = await food.find(query).limit(10).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function SearchByMinWSkip(req, res) {
    const skipPage = parseInt(req.params.skip_page);
    let food = db.collection("recipes");
    try {
        let query = { minutes: { $lte: parseInt(req.params.minutes) } };
        let foodByMinutes = await food.find(query).limit(10).skip(skipPage).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function SearchByIngredient(req, res) {
    let food = db.collection("recipes");
    try {
        let query = { ingredients: { $in: [req.params.ingredients] } };
        let foodByMinutes = await food.find(query).limit(10).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function FixAll(req, res) {
    let food = db.collection("recipes");
    console.log("Fixing all food items");
    try {
        let updateResult = await food.updateMany(
            {},
            [
                {
                    $set: {
                        ingredients: {
                            $map: {
                                input: {
                                    $split: ["$ingredients", ","]
                                },
                                as: "ingredient",
                                in: {
                                    $trim: {
                                        input: "$$ingredient",
                                        chars: " '[]"
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        );

        res.json({ message: 'All foods updated successfully', modifiedCount: updateResult.modifiedCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function UpdateRecipeByID(req, res)  {
    let food = db.collection("recipes");
    let query = { _id: new ObjectId(req.params.id) };
    try {
        let updateFood = await food.findOneAndUpdate(
            query,
             { $set: req.body },
            { new: true }
           
           //req.params.id, req.body, { new: true }
        );
        //console.log(updateFood.id); //testing
        if (!updateFood._id) {
            return res.status(404).json({ message: 'Food not found' });
        }
        updateFood = await food.findOne(query);
        res.json(updateFood);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function DeleteRecipeByID(req, res) {
    let food = db.collection("recipes");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let deleteFood = await food.deleteOne(query);
        if (deleteFood.deletedCount === 0) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



async function CreateRecipe(req, res) {
    let food = db.collection("recipes");
    let newRecipe = req.body;
    let isValid = true;

    // Validate the incoming data
    if (!newRecipe.name || !newRecipe.minutes || !newRecipe.contributor_id || !newRecipe.submitted || !newRecipe.tags || !newRecipe.nutrition || !newRecipe.n_steps || !newRecipe.steps || !newRecipe.description || !newRecipe.ingredients || !newRecipe.n_ingredients) {
        isValid = false;
        return res.status(400).json({ message: 'Invalid request body' });
    }

    try {
        let result = await food.insertOne(newRecipe);
        res.json({
            success: true,
            message: 'Recipe added successfully',
            
        });
    } catch (err) {
        if (err.code === 11000) {
              res.status(500).json({
                success: false,
                message: 'Error adding recipe',
                error: err.message
            });
        }
    }
}


async function VerificationCheck(req, res) {
    let food = db.collection("recipes");

    try {
        let invalidRecipes = await food.aggregate([
            {
                $match: {
                    $nor: [
                        { name: { $exists: false, $type: 'string' } },
                        { minutes: { $exists: false, $type: 'number' } },
                        { contributor_id: { $exists: false, $type: 'number' } },
                        { submitted: { $exists: false, $type: 'date' } },
                        { tags: { $exists: false, $type: 'array' } },
                        { nutrition: { $exists: false, $type: 'array' } },
                        { n_steps: { $exists: false, $type: 'number' } },
                        { steps: { $exists: false, $type: 'array' } },
                        { description: { $exists: false, $type: 'string' } },
                        { ingredients: { $exists: false, $type: 'array' } },
                        { n_ingredients: { $exists: false, $type: 'number' } }
                    ]
                }
            }
        ]).toArray();

        res.json({
            success: true,
            message: 'Invalid recipes retrieved successfully',
            data: invalidRecipes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving invalid recipes',
            error: err.message
        });
    }
}

export default {getRecipesall, getRecipeID, SingleFix, SearchByMin, SearchByMinWSkip, SearchByIngredient, FixAll, UpdateRecipeByID, DeleteRecipeByID, CreateRecipe, VerificationCheck};