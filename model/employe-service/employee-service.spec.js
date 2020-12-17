const { EmployeeService } = require('./employee-service');

describe('Test employee service: create one', () => {
    const employeeService = new EmployeeService();
    test('it should create an employee with valid data', () => {
        const name = 'PAO';
        const workdays = [
            {day: 'MO', startTime: '05:55', endTime: '06:55'},
            {day: 'TU', startTime: '08:55', endTime: '09:55'}
        ];
        const output =  {
            id: 1,
            name: 'PAO',
            workdays: [
                {_day: 'MO', startTime: {_hour: 5, _minutes: 55}, endTime: {_hour: 6, _minutes: 55}},
                {_day: 'TU', startTime: {_hour: 8, _minutes: 55}, endTime: {_hour: 9, _minutes: 55}}
            ]
        };
        expect(employeeService.create({name, workdays})).toEqual(output);
    });
});
