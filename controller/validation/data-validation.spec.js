const { DataValidation } = require('./data-validation');

describe('Test Data Validation function: validateDay', () => {
    const dataValidation = new DataValidation();
    test('it should get True by given (MO)', () => {
        const inputAbbreviation = 'MO';
        expect(dataValidation.validateDay(inputAbbreviation)).toBeTruthy();
    });

    test('it should get False by given (OTHER)', () => {
        const inputAbbreviation = 'OTHER';
        const inputAbbreviationTwo = '2';
        expect(() => dataValidation.validateDay(inputAbbreviation)).toThrow(Error);
        expect(() => dataValidation.validateDay(inputAbbreviationTwo)).toThrow(Error);
    });

    test('it should get throw error by given undefined or empty string', () => {
        expect(() => dataValidation.validateDay()).toThrow(Error);
        expect(() => dataValidation.validateDay("")).toThrow(Error);
    });
});

describe('Test Data validation function: validateTimeFormat', () => {
    const dataValidation = new DataValidation();
    test('it should be True by given (22:30, 23:30)', () => {
        const inputStart = '22:30';
        const inputEnd = '23:30';
        expect(dataValidation.validateTimeFormat(inputStart, inputEnd)).toBeTruthy();
    });

    test('it should throw error by given incorrect format (02:30, 03::30)', () => {
        const inputStart = '02:30';
        const inputEnd = '03::30';
        expect(() => dataValidation.validateTimeFormat(inputStart, inputEnd)).toThrow(Error);
    });

    test('it should throw error by given incorrect format (:, 03:30)', () => {
        const inputStart = ':';
        const inputEnd = '03:30';
        expect(() => dataValidation.validateTimeFormat(inputStart, inputEnd)).toThrow(Error);
    });

    test('it should throw error by given undefined in all o some inputs (23:00-)', () => {
        const input = '23:00';
        expect(() => dataValidation.validateTimeFormat()).toThrow(Error);
        expect(() => dataValidation.validateTimeFormat(input, "")).toThrow(Error);
        expect(() => dataValidation.validateTimeFormat(input)).toThrow(Error);
    });
});

describe('Test Data validation function: validStartTimeBeforeEndTime', () => {
    const dataValidation = new DataValidation();
    test('it should get True by given (20:00) before (20:01)', () => {
        const inputStart = '20:00';
        const inputEnd = '20:01';
        expect(dataValidation.validStartTimeBeforeEndTime(inputStart, inputEnd)).toBeTruthy();
    });

    test('it should get True by given (23:59) before (00:00)', () => {
        const inputStart = '23:59';
        const inputEnd = '00:00';
        expect(dataValidation.validStartTimeBeforeEndTime(inputStart, inputEnd)).toBeTruthy();
    });

    test('it should throw error by given (23:59) before (00:01)', () => {
        const inputStart = '23:59';
        const inputEnd = '00:01';
        expect(() => dataValidation.validStartTimeBeforeEndTime(inputStart, inputEnd)).toThrow(Error);
    });

    test('it should throw error by given undefined in some argument', () => {
        const inputStart = '23:59';
        expect(() => dataValidation.validStartTimeBeforeEndTime(inputStart)).toThrow(Error);
        expect(() => dataValidation.validStartTimeBeforeEndTime()).toThrow(Error);
    });
});

describe('Test Data validation function: validateOneWorkdayFormat', () => {
    const dataValidation = new DataValidation();
    test('it should get True by given ONE valid workday (MO13:00-15:00)', () => {
        const inputWorkday = 'MO13:00-15:00';
        const inputWorkdayTwo = 'mo13:00-15:00';
        expect(dataValidation.validateOneWorkdayFormat(inputWorkday)).toBeTruthy();
        expect(dataValidation.validateOneWorkdayFormat(inputWorkdayTwo)).toBeTruthy();
    });

    test('it should throw error by given TWO valid workdays(MO10:00-12:00,TH12:00-14:00)', () => {
        const inputWorkday = 'MO10:00-12:00,TH12:00-14:00';
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkday)).toThrow(Error);
    });

    test('it should throw error by given DAY not valid format (MR10:00-12:00)', () => {
        const inputWorkday = 'MR10:00-12:00';
        const inputWorkdayTwo = 'M10:00-12:00';
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkday)).toThrow(Error);
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkdayTwo)).toThrow(Error);
    });

    test('it should throw error by given TIME not valid format (MO10:00/12:00) (MO110:00-12:00)', () => {
        const inputWorkday = 'MO10:00/12:00';
        const inputWorkdayTwo = 'MO110:00-12:00';
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkday)).toThrow(Error);
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkdayTwo)).toThrow(Error);
    });

    test('it should throw error by given bad time order (start greater than end) (MO18:00-12:00)', () => {
        const inputWorkday = 'MR18:00-12:00';
        const inputWorkdayTwo = 'MR23:00-04:00';
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkday)).toThrow(Error);
        expect(() => dataValidation.validateOneWorkdayFormat(inputWorkdayTwo)).toThrow(Error);
    });
});

describe('Test Data validation function: validateAllWorkdaysFormat', () => {
    const dataValidation = new DataValidation();
    test('it should get True by given workdays data (MO13:00-15:00,FR13:00-15:00)', () => {
        const inputWorkdays = 'MO13:00-15:00,FR13:00-15:00';
        expect(dataValidation.validateAllWorkdaysFormat(inputWorkdays)).toBeTruthy();
    });

    test('it should throw error by given not valid workdays data (MO13:00-10:00,FR13:00-15:00)', () => {
        const inputWorkdays = 'MO13:00-10:00,FR13:00-15:00';
        const inputWorkdaysTwo = 'MO13H00-10H00,FR13h00-15h00';
        const inputWorkdaysThree = 'LU13H00-10H00,VI13h00-15h00';
        expect(() => dataValidation.validateAllWorkdaysFormat(inputWorkdays)).toThrow(Error);
        expect(() => dataValidation.validateAllWorkdaysFormat(inputWorkdaysTwo)).toThrow(Error);
        expect(() => dataValidation.validateAllWorkdaysFormat(inputWorkdaysThree)).toThrow(Error);
    });

    test('it should throw error by no data given', () => {
        const inputWorkdays = '';
        expect(() => dataValidation.validateAllWorkdaysFormat(inputWorkdays)).toThrow(Error);
        expect(() => dataValidation.validateAllWorkdaysFormat()).toThrow(Error);
    });

});

describe('Test Data validation function: validateExistEmployeeData', () => {
    const dataValidation = new DataValidation();
    test('it should throw error when some data element is empty string or undefined', () => {
        const inputDay = "";
        const inputWorkdays = "algo";
        expect(() => dataValidation.validateExistEmployeeData(inputDay, inputWorkdays)).toThrow(Error);
        expect(() => dataValidation.validateExistEmployeeData(inputDay)).toThrow(Error);
        expect(() => dataValidation.validateExistEmployeeData()).toThrow(Error);
    });
    test('it should get True by given 2 element', () => {
        const inputDay = "some";
        const inputWorkdays = "some2";
        expect(() => dataValidation.validateExistEmployeeData(inputDay, inputWorkdays)).not.toThrow(Error);
    });
});

describe('Test Data validation function: validate', () => {
    test('it should get True by given valid employee data', () => {
        const employeeData = 'PAO=MO13:00-15:00,FR13:00-15:00';
        const dataValidation = new DataValidation(employeeData);
        expect(dataValidation.validate()).toBeTruthy();
    });

    test('it should get an object with error by given missing employee data (=MO13:00-15:00)', () => {
        const employeeData = '=MO13:00-15:00';
        const dataValidation = new DataValidation(employeeData);
        const output = {error: 'Invalid data: missing data'};
        expect(dataValidation.validate()).toEqual(output);
    });

    test('it should get an object with error by not given data ()', () => {
        const employeeData = '';
        const dataValidation = new DataValidation(employeeData);
        const output = {error: 'Invalid data: missing data'};
        expect(dataValidation.validate()).toEqual(output);
    });

    test('it should get an object with error by given not valid day in employee data (pao=M13:00-15:00)', () => {
        const employeeData = 'pao=M13:00-15:00';
        const dataValidation = new DataValidation(employeeData);
        const output = {error: 'Invalid data: Days invalid format'};
        expect(dataValidation.validate()).toEqual(output);
    });

    test('it should get an object with error by given not valid time in employee data (pao=MO25:00-15:00)', () => {
        const employeeData = 'pao=MO25:00-15:00';
        const dataValidation = new DataValidation(employeeData);
        const output = {error: 'Invalid data: Time data format not valid'};
        expect(dataValidation.validate()).toEqual(output);
    });

    test('it should get an object with error by given time not valid order in employee data (pao=MO05:00-01:00)', () => {
        const employeeData = 'pao=MO05:00-01:00';
        const dataValidation = new DataValidation(employeeData);
        const output = {error: 'Invalid data: Time data order not valid, start time should be lower than end time'};
        expect(dataValidation.validate()).toEqual(output);
    });
});
