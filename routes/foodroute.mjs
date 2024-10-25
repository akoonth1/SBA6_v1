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

// Define a simple test route
router.get("/test", (req, res) => {
    res.send("Hello World Food Route");
});

// Define a route to get all food items
router.get("/food", async (req, res) => {
    let food = await db.collection("Recipes").find().limit(10).toArray();
    res.json(food);
});


// Define a route to get a single food item by id

router.get("/food/:id", async (req, res) => {
    let food = db.collection("Recipes");
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
});

// Define a route to get a single food item by id for test item

// router.get("/food/trueid/:id", async (req, res) => {
//     let food = db.collection("test");
//     const id = parseInt(req.params.id);
//     try {
//         let query = { id: id };
//         let oneFood = await food.findOne(query);
//         if (!oneFood) {
//             return res.status(404).json({ message: 'Food not found' });
//         }
//         res.json(oneFood);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


router.get("/food/fix/:id", async (req, res) => {
    let food = db.collection("Recipes");
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
});



//New route to get food by minutes
router.get("/food/minutes/:minutes", async (req, res) => {
    let food = db.collection("Recipes");
    try {
        let query = { minutes: { $lte: parseInt(req.params.minutes) } };
        let foodByMinutes = await food.find(query).limit(10).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//New route to get food by minutes
router.get("/food/minutes/:minutes/:skip_page", async (req, res) => {
    const skipPage = parseInt(req.params.skip_page);
    let food = db.collection("Recipes");
    try {
        let query = { minutes: { $lte: parseInt(req.params.minutes) } };
        let foodByMinutes = await food.find(query).limit(10).skip(skipPage).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//New route to get food by minutes
router.get("/food/ingredients/:ingredients", async (req, res) => {
    let food = db.collection("Recipes");
    try {
        let query = { ingredients: { $in: [req.params.ingredients] } };
        let foodByMinutes = await food.find(query).limit(10).toArray();
        res.json(foodByMinutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




// Test for fixing individual food item
// Define a route to fix the ingredients field for a single food item by id
router.get("/food/fix_sample/:id", async (req, res) => {
    let food = db.collection("Recipes");
    try {
        let query = { _id: new ObjectId(req.params.id) };
        let pipeline = [
            { $match: query },
            {
                $set: {
                    ingredients: {
                        $map: {
                            input: { $split: ["$ingredients", ","] },
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
        ];
        let oneFood = await food.aggregate(pipeline).toArray();
        if (oneFood.length === 0) {
            return res.status(404).json({ message: 'Food not found' });
        }

        // Update the entry with the processed ingredients
        let updatedFood = await food.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { ingredients: oneFood[0].ingredients } }
        );

        if (updatedFood.matchedCount === 0) {
            return res.status(404).json({ message: 'Food not found for update' });
        }

        res.json({ message: 'Food updated successfully', food: oneFood[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});






//Only use to fix initial data
// Define a route to update all documents in the Recipes collection
router.put("/food/fix_all", async (req, res) => {
    let food = db.collection("Recipes");
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
});



//Update by name
router.put('/update/name/:name', async (req, res) => {
    try {
        let updateFood = await Food.findOneAndUpdate(
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
});




// Define a route to delete a single food item by id
router.delete("/food/:id", async (req, res) => {
    let food = db.collection("newRecipes");
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
});


export default router;



