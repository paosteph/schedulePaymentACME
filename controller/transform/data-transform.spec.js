const { DataTransform } = require('./data-transform');

describe('Test data transform function: transform', () => {
    test('it should get a json object by given valid string employee data', () => {
        const employeeData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const dataTransform = new DataTransform(employeeData);
        const output = {
            name: 'PAO',
            workdays: [
                {day: 'MO', startTime: '13:00', endTime: '15:00'},
                {day: 'FR', startTime: '13:00', endTime: '15:00'}
            ]
        };
        expect(dataTransform.transform()).toEqual(output);
    });

    test('it should throw an error by not data ', () => {
        const dataTransform = new DataTransform();
        expect(() => dataTransform.transform()).toThrow(Error);
    });
});
