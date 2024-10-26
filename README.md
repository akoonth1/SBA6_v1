https://www.mockaroo.com/


# Project Requirements and Routes

## Requirement Weight

1. **Use at least three different data collections within the database (such as users, posts, or comments).**  
   *Weight: 5%*

2. **Utilize reasonable data modeling practices.**  
   *Weight: 10%*

3. **Create GET routes for all data that should be exposed to the client, using appropriate query commands to retrieve the data from the database.**  
   *Weight: 10%*

4. **Create POST routes for data, as appropriate, using appropriate insertion commands to add data to the database. At least one data collection should allow for client creation via a POST request.**  
   *Weight: 10%*

5. **Create PATCH or PUT routes for data, as appropriate, using appropriate update commands to change data in the database. At least one data collection should allow for client manipulation via a PATCH or PUT request.**  
   *Weight: 10%*

6. **Create DELETE routes for data, as appropriate, using appropriate delete commands to remove data from the database. At least one data collection should allow for client deletion via a DELETE request.**  
   *Weight: 10%*

7. **Include sensible indexes for any and all fields that are queried frequently. For fields that may have a high write-to-read ratio, you may forgo indexes for performance considerations. Make comments of this where applicable.**  
   *Weight: 5%*

8. **Include sensible MongoDB data validation rules for at least one data collection.**  
   *Note: This may be accomplished in a number of ways. If you choose to perform this task outside of your application's code, you must include a way to test the validation within the application's routes. This can be as simple as providing a POST route that attempts to create an invalid document and displays the resulting error.*  
   *Weight: 5%*

9. **Populate your application's collections with sample data illustrating the use case of the collections. You must include at least five sample documents per collection.**  
   *Weight: 5%*

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