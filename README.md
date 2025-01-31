# Menu Management Backend

## Project Description
This project is a Node.js backend application for managing a restaurant menu. It provides APIs for creating, retrieving, updating, and searching categories, subcategories, and menu items. The system is designed with a hierarchical structure where categories can have multiple subcategories, and subcategories can have multiple items.

## Installation Instructions
1. Clone the repository:  git clone https://github.com/Aniket7560/Guestara_Intern_task.git


2. Navigate to the project directory:  cd menu-management-backend


3. Install dependencies:     npm install


4. Create a `.env` file in the root directory and add your MongoDB connection string :                     

   MONGODB_URI=your_mongodb_connection_string


## How to Run Locally
1. Start the server in development mode:            npm run dev


2. The server will start running on `http://localhost:5000` by default.

## API Endpoints

### Categories
- CREATE: POST `/api/categories`
- GET ALL: GET `/api/categories`
- GET ONE: GET `/api/categories/:identifier`
- EDIT: PATCH `/api/categories/:id`

### Subcategories
- CREATE: POST `/api/subcategories`
- GET ALL: GET `/api/subcategories`
- GET BY CATEGORY: GET `/api/subcategories/category/:categoryId`
- GET ONE: GET `/api/subcategories/:identifier`
- EDIT: PATCH `/api/subcategories/:id`

### Items
- CREATE: POST `/api/items`
- GET ALL: GET `/api/items`
- GET BY CATEGORY: GET `/api/items/category/:categoryId`
- GET BY SUBCATEGORY: GET `/api/items/subcategory/:subCategoryId`
- GET ONE: GET `/api/items/:identifier`
- EDIT: PATCH `/api/items/:id`
- SEARCH: GET `/api/items/search/:name`

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
