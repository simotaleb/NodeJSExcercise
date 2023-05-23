# Employee Data API

The Employee Data API is an Express server that interfaces with the BambooHR API to fetch employee data, cache it for efficiency, and serve it to clients in a convenient format.

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/employee-data-api.git

2. Navigate to the project directory:
    cd employee-data-api

3. Install the dependencies:
    npm install

4. Set up environment variables:
    Create a '.env' file in the project root directory.
    Add the following environment variables to the '.env' file:
        BAMBOOHR_APIKEY=YOUR_BAMBOOHR_API_KEY
        COMPANY_DOMAIN=YOUR_COMPANY_DOMAIN
    Replace 'YOUR_BAMBOOHR_API_KEY' with your actual BambooHR API key.
    Replace 'YOUR_COMPANY_DOMAIN' with your company's domain in BambooHR.

## Running the App

1. To start the Express server & run the app, use the following command: 
    node app.js

    The server will start running on http://localhost:3000. You can send a GET request to http://localhost:3000/employees to retrieve the employee data in a JSON format.
    Make sure to set up the required environment variables (BAMBOOHR_APIKEY and COMPANY_DOMAIN) before running the app.

## Running tests

1. Running Tests
    To run tests, use the following command:
    npx jest

