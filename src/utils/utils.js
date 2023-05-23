// utils.js
// This module defines a set of utility functions that are used in other parts of the application. 
// They perform common tasks such as calculating an employee's tenure and fetching data from a cache.


// Calculates tenure in days
// This function takes a string representing a date (hireDateStr) as its parameter
// It returns the difference, in days, between the current date and hireDateStr
const calculateTenure = hireDateStr => {
    const hireDate = new Date(hireDateStr);
    const now = new Date();
  
    // If hire date is in the future, return 0
    if (hireDate > now) return 0;
  
    const diff = now - hireDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
    return days;
  };
  
  
  // Returns work anniversary date for employee during the current year
  // This function takes a Date object as its parameter
  // If the date is in the future, it returns null
  // Otherwise, it returns a new Date object representing the employee's work anniversary in the current year
const getWorkAnniversary = date => {
    //check if the hire date is in the future
    if(date > new Date()){
        return null;
    }
    const month = date.getMonth();
    const day = date.getDate();
    const currentYear = new Date().getFullYear(); // Get the current year
    
    return new Date(currentYear, month, day);
    };
    
  
// Retrieves an employee's photo URL from cache
// This function takes the employees Cache & employee Id as  parameters
// If the employee is not found, it returns null
// Otherwise, it returns the url for the employee photo
const getEmployeePhotoUrl = (employeeCache, employeeId) => {
    const employee = employeeCache[`id:${employeeId}`];
    if (employee) {
        return employee.photoUrl;
    }
    return null; 
  };
  
  
// Retrieves an employee's manager's ID from cache
// This function takes the employees Cache & the manager name as  parameters
// If the employee is not found, it returns null
// Otherwise, it returns the manager id
const getManagerId = (employeeCache, managerName) => {
    const [lastName, firstName] = managerName.split(',').map(namePart => namePart.trim()); //format manager name due to the report returning value such as "LastName, FirstName"
    const formattedManagerName = `${firstName} ${lastName}`;
    const manager = employeeCache[`displayName:${formattedManagerName}`];
    if (manager) {
        return manager.id;
    }
    return null; 
  };

// Export all the functions
module.exports = {
    getWorkAnniversary,
    getEmployeePhotoUrl,
    getManagerId,
    calculateTenure,
  };