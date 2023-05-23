# Employee Data API

The Employee Data API is an Express server that interfaces with the BambooHR API to fetch employee data, cache it for efficiency, and serve it to clients in a convenient format.





## Run Locally

Clone the project

```bash
  git clone https://github.com/simotaleb/NodeJSExcercise
```

Go to the project directory

```bash
  cd NodeJSExcercise
```

Install dependencies

```bash
  npm install
```

Set up environment variables

To run this project, you will need to add the following environment variables to your .env file

`BAMBOOHR_APIKEY=YOUR_BAMBOOHR_API_KEY`

`COMPANY_DOMAIN=YOUR_COMPANY_DOMAIN`

Replace YOUR_BAMBOOHR_API_KEY with your actual BambooHR API key & YOUR_COMPANY_DOMAIN with your company's domain in BambooHR

Start the server

```bash
  npm start
```
The server will start running on http://localhost:3000. You can send a GET request to http://localhost:3000/employees to retrieve the employee data in a JSON format.
Make sure to set up the required environment variables (BAMBOOHR_APIKEY and COMPANY_DOMAIN) before running the app.

Run tests
```bash
  npm test
```    
## Features

- Get custom report with all employees data
- Get employeesDirectory data & cache it
- Calculate Tenure functionality
- Get Manager Id for employees that have Manager
- Get Work Anniversary for employees
- Get Photo URL for employees that have photos


## Tech Stack



**Server:** Node, Express, Jest, Dotenv, Axios

