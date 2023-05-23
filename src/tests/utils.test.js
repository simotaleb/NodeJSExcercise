const { calculateTenure, getWorkAnniversary, getEmployeePhotoUrl, getManagerId } = require('../../src/utils/utils');

describe('Utils', () => {
    // Test for getWorkAnniversary function
    describe('getWorkAnniversary', () => {
        it('should return the correct work anniversary', () => {
            const date = new Date('2020-01-01');
            const anniversary = getWorkAnniversary(date);

            // Check if the returned anniversary has the same month, date, and year as the input date
            expect(anniversary.getMonth()).toBe(date.getMonth());
            expect(anniversary.getDate()).toBe(date.getDate());
            expect(anniversary.getFullYear()).toBe(new Date().getFullYear());
        });

        it('should return null for a future date', () => {
            const futureDate = new Date();
            futureDate.setFullYear(futureDate.getFullYear() + 1); // Setting the date to next year
            const anniversary = getWorkAnniversary(futureDate);

            // Check if the returned anniversary is null for a future date
            expect(anniversary).toBeNull();
        });
    });

    // Test for getEmployeePhotoUrl function
    describe('getEmployeePhotoUrl', () => {
        it('should return photo URL for an existing employee', () => {
            const employeeCache = {
                'id:1': { photoUrl: 'http://example.com/photo.jpg' }
            };
            const url = getEmployeePhotoUrl(employeeCache, 1);

            // Check if the returned URL matches the expected photo URL for the employee
            expect(url).toBe('http://example.com/photo.jpg');
        });

        it('should return null for a non-existing employee', () => {
            const employeeCache = {};
            const url = getEmployeePhotoUrl(employeeCache, 1);

            // Check if the returned URL is null for a non-existing employee
            expect(url).toBeNull();
        });
    });

    // Test for getManagerId function
    describe('getManagerId', () => {
        it('should return manager ID for an existing manager', () => {
            const employeeCache = {
                'displayName:John Doe': { id: 1 }
            };
            const id = getManagerId(employeeCache, 'Doe, John');

            // Check if the returned ID matches the expected manager ID
            expect(id).toBe(1);
        });

        it('should return null for a non-existing manager', () => {
            const employeeCache = {};
            const id = getManagerId(employeeCache, 'Doe, John');

            // Check if the returned ID is null for a non-existing manager
            expect(id).toBeNull();
        });
    });

    // Test for calculateTenure function
    describe('calculateTenure', () => {
        it('should return 0 for future dates', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1); // Set the date to +1 day into the future

            const result = calculateTenure(futureDate);

            // Check if the returned tenure is 0 for future dates
            expect(result).toEqual(0);
        });

        it('should return the correct number of days for past dates', () => {
            const pastDate = '2020-01-01';
            // Calculate the expected difference in days
            const expectedDays = Math.floor((new Date().getTime() - new Date(pastDate).getTime()) / (1000 * 3600 * 24));

            const result = calculateTenure(pastDate);

            // Check if the returned tenure matches the expected number of days
            expect(result).toEqual(expectedDays);
        });
    });
});
