import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { ObjectId } from "mongodb";
import db  from "../db/conn.mjs";
import get_recipe from "../controllers/recipe_controller.mjs";



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
router.get("/food", get_recipe.getRecipesall);


// Define a route to get a single food item by id

router.get("/food/:id", get_recipe.getRecipeID);


// Define a route to fix the ingredients field for a single food item by id
router.get("/food/fix/:id", get_recipe.SingleFix);



//New route to get food by minutes
router.get("/food/minutes/:minutes", get_recipe.SearchByMin);


//New route to get food by minutes
router.get("/food/minutes/:minutes/:skip_page", get_recipe.SearchByMinWSkip );



//New route to get food by ingredients
router.get("/food/ingredients/:ingredients",get_recipe.SearchByIngredient);



//Only use to fix initial data
// Define a route to update all documents in the Recipes collection
router.put("/food/fix_all", get_recipe.FixAll);



//Update by name
router.patch('/update/:id', get_recipe.UpdateRecipeByID);


// Define a route to delete a single food item by id
router.delete("/food/:id", get_recipe.DeleteRecipeByID );


// Define a route to add a new recipe
router.post('/create', get_recipe.CreateRecipe);




router.get('/recipes/invalid', get_recipe.VerificationCheck );




export default router;





// Test for fixing individual food item
// // Define a route to fix the ingredients field for a single food item by id
// router.get("/food/fix_sample/:id", async (req, res) => {
//     let food = db.collection("recipes");
//     try {
//         let query = { _id: new ObjectId(req.params.id) };
//         let pipeline = [
//             { $match: query },
//             {
//                 $set: {
//                     ingredients: {
//                         $map: {
//                             input: { $split: ["$ingredients", ","] },
//                             as: "ingredient",
//                             in: {
//                                 $trim: {
//                                     input: "$$ingredient",
//                                     chars: " '[]"
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         ];
//         let oneFood = await food.aggregate(pipeline).toArray();
//         if (oneFood.length === 0) {
//             return res.status(404).json({ message: 'Food not found' });
//         }

//         // Update the entry with the processed ingredients
//         let updatedFood = await food.updateOne(
//             { _id: new ObjectId(req.params.id) },
//             { $set: { ingredients: oneFood[0].ingredients } }
//         );

//         if (updatedFood.matchedCount === 0) {
//             return res.status(404).json({ message: 'Food not found for update' });
//         }

//         res.json({ message: 'Food updated successfully', food: oneFood[0] });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

// 