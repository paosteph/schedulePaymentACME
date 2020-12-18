const { AppController } = require('./app-controller');

describe('Test App Controller function: CreateOneEmployee', () => {
    const controller = new AppController();
    test('it should create an employee by given valid data (PAO=MO13:00-15:00,FR13:00-15:00)', () => {
        const inputData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const output =  {
            id: 1,
            name: 'PAO',
            workdays: [
                {_day: 'MO', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}},
                {_day: 'FR', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}}
            ]
        };
        expect(controller.createOneEmployee(inputData)).toEqual(output);
    });

    test('it should get an object with error with not valid employee data (=MO13:00-15:00)', () => {
        const input = '=MO13:00-15:00';
        const output = {error: 'Invalid data: missing data'};
        expect(controller.createOneEmployee(input)).toEqual(output);
    });

    test('it should get an object with error by not given data ()', () => {
        const output = {error: 'Cannot read property \'split\' of undefined'};
        expect(controller.createOneEmployee()).toEqual(output);
    });
});

describe('Test App Controller function: CreateEmployees', () => {
    const controller = new AppController();
    test('it should get an array of employees by given an string array valid data ([PAO=MO13:00-15:00,ZU=FR13:00-15:00])', () => {
        const input = ['PAO=MO13:00-15:00','ZU=FR13:00-15:00'];
        const output = [
            {
                id: 1,
                name: 'PAO',
                workdays: [
                    {_day: 'MO', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}},
                ]
            },
            {
                id: 2,
                name: 'ZU',
                workdays: [
                    {_day: 'FR', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}},
                ]
            }
        ];
        expect(controller.createEmployees(input)).toEqual(output);
    });
    test('it should get an object with error by given an empty string array valid data ()', () => {
        const input = [];
        const output = {"error": "File is empty"};
        expect(controller.createEmployees(input)).toEqual(output);
    });
    test('it should get an array object with error by given an string array with not valid data ([PAOMO13:00-15:00])', () => {
        const input = ['PAOMO13:00-15:00'];
        const output = [{error: 'Invalid data: missing data'}];
        expect(controller.createEmployees(input)).toEqual(output);
    });
});

describe('Test App Controller function: getEmployeePay', () => {
    const controller = new AppController();
    test('it should get a pay object by given valid employee Id', () => {
        const inputId = 1;
        const inputData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const output = {
            employee: {
                id: 1,
                name: 'PAO',
                workdays: [
                    {_day: 'MO', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}},
                    {_day: 'FR', startTime: {_hour: 13, _minutes: 0}, endTime: {_hour: 15, _minutes: 0}}
                ]
            },
            pay: 60
        };
        controller.createOneEmployee(inputData);
        expect(controller.getEmployeePay(inputId)).toEqual(output);
    });

    test('it should get an object with error by given not valid employee Id', () => {
        const inputId = 3;
        const inputData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const output = {error: 'Employee ID is not registered'};
        controller.createOneEmployee(inputData);
        expect(controller.getEmployeePay(inputId)).toEqual(output);
    });

    test('it should get an object with error by not id given', () => {
        const inputData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const output = {error: 'Id is undefined'};
        controller.createOneEmployee(inputData);
        expect(controller.getEmployeePay()).toEqual(output);
    });
});
