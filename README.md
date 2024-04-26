# E-commerce Backend 

This project provides a back end for an e-commerce website using Express.js and Sequelize, allowing your company to compete effectively in the online retail space.

## Acceptance Criteria

### Setting Up Database Connection

- **Database Configuration**:
  DB_NAME='ecommerce_db'
  DB_PASSWORD=''
  DB_USER='root'


- **Connecting to Database**: Upon configuring the environment variables, the application should be able to connect to the database using Sequelize.

### Database Initialization

- **Schema and Seed Commands**: Running the schema and seed commands should create a development database and populate it with test data.

### Application Invocation

- **Starting the Server**: Executing the command to start the application should initialize the server, and Sequelize models should be synchronized to the MySQL database.

### API Routes

- **GET Routes**: Opening API GET routes in Insomnia Core for categories, products, or tags should display the data for each route in a formatted JSON format.

- **POST, PUT, and DELETE Routes**: Testing API POST, PUT, and DELETE routes in Insomnia Core should allow successful creation, update, and deletion of data in the database.

## Technologies Used

- Express.js
- Sequelize
- MySQL

## Installation and Usage

1. Clone the repository:
  `https://github.com/westmarquest/ecommerce1/tree/main`

2. Install dependencies:
   `npm install`

   
3. Configure environment variables by creating a `.env` file in the root directory and adding the required database credentials.

4. Run schema and seed commands:
`npm run seed`


5. Start the server:
`npm start`

6. Use Insomnia Core or a similar tool to test the API routes for categories, products, and tags.
   A sample video for testing routes can be viewed here : `https://drive.google.com/file/d/1e7eSm1Ke5rIFG2rUUncxx7NQMXGxypfy/view?usp=sharing`




