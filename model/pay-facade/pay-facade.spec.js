const { PayFacade } = require('./pay-facade');

describe('Test Pay facade function getEmployeePayAmount', () => {
    test('it should get a value by given correct employee data', () => {
        const employee = {
            name: 'PAO',
            workdays: [
                {day: 'MO', startTime: {hour: 5, minutes: 55}, endTime: {hour: 6, minutes: 55}},
                {day: 'TU', startTime: {hour: 8, minutes: 55}, endTime: {hour: 9, minutes: 55}}
            ]
        };
        const payFacade = new PayFacade();
        const output = 40.8;
        expect(payFacade.getEmployeePayAmount(employee)).toBeCloseTo(output);
    });

    test('it should throw error when data is undefined', () => {
        const employee = undefined;
        const payFacade = new PayFacade();
        expect(() => payFacade.getEmployeePayAmount(employee)).toThrow(Error);
    });

    test('it should throw error when data is an empty object', () => {
        const employee = {};
        const payFacade = new PayFacade();
        expect(() => payFacade.getEmployeePayAmount(employee)).toThrow(Error);
    });
});
