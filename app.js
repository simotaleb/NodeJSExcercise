// app.js
// This script sets up an Express server that handles requests to the /employees endpoint.
// It interfaces with the BambooHR API to fetch employee data, caches the data for efficiency, 
// and serves it to clients in a convenient format.

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const { errorHandler, ExternalApiError, ValidationError } = require('./src/handlers/errorHandler');
const { getWorkAnniversary, getEmployeePhotoUrl, getManagerId, calculateTenure } = require('./src/utils/utils');

dotenv.config();

const app = express();
const port = 3000;

let employeeCache = {};

// Axios configuration for BambooHR API
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  auth: {
    username: process.env.BAMBOOHR_APIKEY,
    password: 'x', // BambooHR API does not require a password, but Axios requires this field
  },
};

// Environment variables validation
if (!process.env.BAMBOOHR_APIKEY || !process.env.COMPANY_DOMAIN) {
  console.error('Required environment variables are not set.');
  process.exit(1);
}

// GET request handler for /employees endpoint
app.get('/employees', async (req, res) => {
    try {
      const payload = {
        title: "Get All Employees Report",
        fields: [
          "id",
          "firstName",
          "lastName",
          "displayName",
          "dateOfBirth",
          "isPhotoUploaded",
          "mobilePhone",
          "workEmail",
          "jobTitle",
          "department",
          "supervisor",
          "hireDate",
          "location",
          "gender"
        ]
      };
  
      const { data } = await axios.post(`https://api.bamboohr.com/api/gateway.php/${process.env.COMPANY_DOMAIN}/v1/reports/custom`, payload, config);
      
      const employees = data.employees.map(emp => {
        return {
          id: emp.id,
          first_name: emp.firstName,
          last_name: emp.lastName,
          name: `${emp.firstName} ${emp.lastName}`,
          display_name: emp.displayName,
          date_of_birth: new Date(emp.dateOfBirth),
          avatar_url: emp.isPhotoUploaded ? getEmployeePhotoUrl(employeeCache, emp.id) : null,
          personal_phone_number: emp.mobilePhone,
          work_email: emp.workEmail,
          job_title: emp.jobTitle,
          department: emp.department,
          manager_id: emp.supervisor ? getManagerId(employeeCache, emp.supervisor) : null,
          manager_name : emp.supervisor,
          start_date: new Date(emp.hireDate),
          tenure: calculateTenure(emp.hireDate), //switch to number of days
          work_anniversary: getWorkAnniversary(new Date(emp.hireDate)),
          location: emp.location,
          gender: emp.gender
        };
      });
  
      res.json(employees);
    } catch (error) {
      if(error.response){
        next(new ExternalApiError());
      }else{
        next(error);
      }
    }
  });

app.use(errorHandler)
  


// Fetches and caches the employee directory
// This function makes a GET request to the BambooHR API's employees directory endpoint
// It stores each employee in an in-memory cache (employeeCache) using two keys: `id:<employee_id>` and `displayName:<employee_display_name>`
  const cacheEmployeeDirectory = async () => {
    try {
      const { data } = await axios.get(`https://api.bamboohr.com/api/gateway.php/${process.env.COMPANY_DOMAIN}/v1/employees/directory`, config);
    
      data.employees.forEach((employee) => {
        // Generate the keys
        const idKey = `id:${employee.id}`;
        const displayNameKey = `displayName:${employee.displayName}`;
  
        // Store the employee in the cache using all the keys
        employeeCache[idKey] = employee;
        employeeCache[displayNameKey] = employee;
      });
  
      console.log('Employee directory cached');
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw new Error('An error occurred while caching employee directory.');
    }
  };


// Initialize the cache then start the server
cacheEmployeeDirectory()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
      if (!process.env.BAMBOOHR_APIKEY) {
        // This is a validation error
        console.error(new ValidationError('BAMBOOHR_APIKEY is not set'));
      } else {
        console.error(error);
      }
      process.exit(1);
    });
