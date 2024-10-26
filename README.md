
# Project Requirements and Routes


### Project Description

This is a MongoDb, Exoress, and Node backend with 3 collections based on users, reviews, and recipes. Using the routes you can explore the database, pull users, reviews, and recipes. Recipes can be searched based on ingredients, cook time in minutes, and the standard id search.
All collections can be updated, added to via post, and deleted. Both MongoDB and Mongoose are used. 

[GitHub Repository](https://github.com/akoonth1/SBA_6v1 "GitHub SBA6")


## Available Routes/Endpoints

### Testing
- **GET /users/testing** : Test route
- **GET /reviews/testing** : Test route
- **GET /main/test** : Test route for recipes

### Users
- **GET /users/all**: Retrieve all users.
- **GET /users/single/:id**: Retrieve user based on doc id
- **GET /users/idnum/:idnum**: Retrieve user based on id number
- **POST /users/create**: Create a new user.
- **PUT /users/update/:id**: Update a user by doc id
- **PUT /users/update/name/:name**: Update a user by name field
- **DELETE /users/single:id**: Delete a user by id

### Reviews
- **GET /reviews/all**: Retrieve all reviews.
- **GET /reviews/single/:id**: Retrieve review based on doc id
- **GET /reviews/Review_ID/:Review_ID**: Retrieve review based on review id
- **POST /reviews/create**: Create a new review.
- **PUT /reviews/update/:id**: Update a review by doc id
- **PATCH /reviews/update/name/:name**: Update a review by reviewer name field
- **DELETE /reviews/single:id**: Delete a review by id

### Recipes
- **GET /main/food**: Retrieve all recipes (limit 10)
- **GET /main/food/:id**: Retrieve food by doc id
- **GET /main/food/minutes/:minutes**: Retrieve foods with prep-time less than minutes
- **GET /main/food/minutes/:minutes/:skip_page**: Retrieve foods with prep-time less than minutes with pagination
- **GET /main/food/ingredients/:ingredients**: Retrieve foods with ingredient
- **POST /main/create**: Create a new recipe
 **GET /main/food/fix/:id**: Retrieve food by doc id with fixed ingredient array
- **PATCH /main/update/:id**: Update a recipe by doc id
- **DELETE /main/food/:id**: Delete a recipe by doc id



### Additional Routes
- **PUT /food/fix_all**: Update all food items to fix the ingredients field
- **GET /seed/users**: Seed the database with sample user data
- **GET /seed/recipes**: Seed the database with sample recipe data
- **GET /seed/reviews**: Seed the database with sample review data

### Technologies Used
- VS Code
- JavaScript
- MongoDB
- Express
- Node
- Mongoose


### How to Get Started
1. Clone the repository:
    ```bash
    git clone https://github.com/akoonth1/SBA6_v1
    ```
2. Navigate to the project directory:
    ```bash
    npm start
    ```
3. Open `localhost:3003` in chrome or use Thunder client or Postman

4. Run `seed routes` to populate database

5. Run `Fix all` route to transform data to be more searchable.

### Acknowledgments
- https://www.mockaroo.com/
-- used for mock data
- Recipe Dataset from Food.com via Kaggle
--Recipe Data



[GitHub Repository](https://github.com/akoonth1/SBA6_v1 "GitHub SBA6")