Greenhouse Management App
A web application that allows users to manage and view plants in their personalized greenhouse. Users can log in to view detailed plant information, including common and scientific names, family, water needs, sunlight requirements, and soil types.

Table of Contents
Project Overview
Features
Setup and Installation
Usage
Endpoints
Technologies Used
Contributing
Project Overview
This application enables users to:

npm start the backend
npm start the fron end

Log in to access personalized greenhouse data.
View plant details in a structured format with images and plant information.
Store and update their greenhouse collection.
Features
User Authentication: Secure login using JWT-based authentication.
Greenhouse Overview: Displays user-specific plants in a visual grid with images and information.
Responsive Layout: Plant images on the left and text on the right, displayed in a column layout.
Setup and Installation
Prerequisites
Node.js: Version 14.x or above
MongoDB: Ensure MongoDB is installed and running on your machine.
Installation Steps
Clone the Repository:

bash
Copy code
git clone
cd greenthumb.app
Install Dependencies:

Install server dependencies:
bash
Copy code
cd be
npm install
npm start
Install client dependencies:
bash
Copy code
cd ../fe
npm install
npm start
Set Up Environment Variables:

In the be folder, create a .env file and add your configuration:
plaintext
Copy code
PORT=5000

Seed initial plant data by running the following command in the be folder:
bash
Copy code
node seed.js
Run the Application:

Start the backend server:
bash
Copy code
cd be
npm start
Start the frontend server:
bash
Copy code
cd ../fe
npm start
The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000.

Usage
Log In: Access the app by logging in with a username and password.
View Greenhouse: After logging in, navigate to the "Greenhouse" page to view the plant list.
Add or Edit Plants (if applicable): Use your interface to add new plants to your greenhouse collection.
Endpoints
Method Endpoint Description
POST /api/login User login, returns JWT token
GET /api/greenhouse Retrieves user's greenhouse plants
POST /api/plants Adds a new plant to user's greenhouse
Technologies Used
Frontend: React, Axios, Bootstrap, CSS for styling.
Backend: Node.js, Express, Mongoose.
Database: MongoDB.
Authentication: JWT-based authentication.
Contributing
If you’d like to contribute, please fork the repository, create a new branch, and submit a pull request with your changes. We welcome all contributions to make this app better!
