// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// import error from '../errorhandle.mjs';
// dotenv.config();


// const userSchema = new mongoose.Schema({
//     {
//       "$schema": "http://json-schema.org/draft-07/schema#",
//       "title": "Recipe",
//       "type": "object",
//       "required": [
//         "_id",
//         "name",
//         "id",
//         "minutes",
//         "contributor_id",
//         "submitted",
//         "tags",
//         "nutrition",
//         "n_steps",
//         "steps",
//         "description",
//         "ingredients",
//         "n_ingredients"
//       ],
//       "properties": {
//         "_id": {
//           "type": "string",
//           "description": "Unique identifier for the recipe"
//         },
//         "name": {
//           "type": "string",
//           "description": "Name of the recipe"
//         },
//         "id": {
//           "type": "integer",
//           "description": "Recipe ID"
//         },
//         "minutes": {
//           "type": "integer",
//           "description": "Time required to prepare the recipe in minutes"
//         },
//         "contributor_id": {
//           "type": "integer",
//           "description": "ID of the contributor who submitted the recipe"
//         },
//         "submitted": {
//           "type": "string",
//           "format": "date",
//           "description": "Date when the recipe was submitted"
//         },
//         "tags": {
//           "type": "string",
//           "description": "Tags associated with the recipe"
//         },
//         "nutrition": {
//           "type": "array",
//           "items": {
//             "type": "number"
//           },
//           "description": "Nutritional information of the recipe"
//         },
//         "n_steps": {
//           "type": "integer",
//           "description": "Number of steps in the recipe"
//         },
//         "steps": {
//           "type": "string",
//           "description": "Steps to prepare the recipe"
//         },
//         "description": {
//           "type": "string",
//           "description": "Description of the recipe"
//         },
//         "ingredients": {
//           "type": "string",
//           "description": "Ingredients required for the recipe"
//         },
//         "n_ingredients": {
//           "type": "integer",
//           "description": "Number of ingredients in the recipe"
//         }
//       }
//     }
// });