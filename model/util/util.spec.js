const { getTariffValue, calculateMinutes, calculateTimeWorked, validateEndTimeFormat,
    convertToRuleScheduleStartTime, convertToRuleScheduleEndTime, isAllFirstSchedule,
    isAllSecondSchedule, isAllThirdSchedule, isInFirstAndSecondSchedule,
    isInSecondAndThirdSchedule } = require('./util');

describe("Test util function: calculate total minutes ", () => {
    test("it should get a total minutes given an hour (24:00)", () => {
        const inputHour = 24;
        const inputMinutes = 0;
        const output = 1440;
        expect(calculateMinutes(inputHour, inputMinutes)).toBe(output);
    });

    test("it should get a total minutes given an hour (00:00)", () => {
        const inputHour = 0;
        const inputMinutes = 0;
        const output = 0;
        expect(calculateMinutes(inputHour, inputMinutes)).toBe(output);
    });

    test("it should throw Error when some time is empty", () => {
        let inputHour = 15;
        expect(() => calculateMinutes(inputHour)).toThrow(Error);
    });
});

describe("Test util function: validateEndTimeFormat", () => {
    test("it should get a [24,0] when endTime is 00:00", () => {
        const inputHour = 0;
        const inpurMinutes = 0;
        const output = [24,0];
        expect(validateEndTimeFormat(inputHour, inpurMinutes)).toEqual(output);
    });

    test("it should not get 24:00 when endTime is 23:59", () => {
        const inputHour = 23;
        const inputMinutes = 59;
        const output = [24,0];

        expect(validateEndTimeFormat(inputHour, inputMinutes)).not.toEqual(output);
    });

    test("it should throw Error when not endTime is given", () => {
        expect(() => validateEndTimeFormat()).toThrow(Error);
    });
});

describe("Test util function: calculateTimeWorked", () => {
    test("it should get a 2:15 time worked between time (13:00 - 15:00)", () => {
        const inputStartHour = 13;
        const inputStartMinutes = 0;
        const inputEndHour = 15;
        const inputEndMinutes = 15;
        const output = '2:15';
        expect(calculateTimeWorked(inputStartHour, inputStartMinutes, inputEndHour, inputEndMinutes)).toBe(output);
    });

    test("it should get a 23:58 time worked in HH:MM between (00:01 - 23:59)", () => {
        const inputStartHour = 0;
        const inputStartMinutes = 1;
        const inputEndHour = 23;
        const inputEndMinutes = 59;
        const output = '23:58';
        expect(calculateTimeWorked(inputStartHour, inputStartMinutes, inputEndHour, inputEndMinutes)).toBe(output);
    });
});

describe("Test util function: convertToRuleScheduleStartTime", () => {
    test("it should get a equivalent military start time by given (12:01)", () => {
        const inputHour = 12;
        const inputMinutes = 1;
        const output = 1201;
        expect(convertToRuleScheduleStartTime(inputHour, inputMinutes)).toBe(output);
    });

    test("it should get a equivalent military start time by given (12:00)", () => {
        const inputHour = 12;
        const inputMinutes = 0;
        const output = 1201;
        expect(convertToRuleScheduleStartTime(inputHour, inputMinutes)).toBe(output);
    });
});

describe("Test util function: convertToRuleScheduleEndtTime", () => {
    test("it should get a equivalent military (2400) end time by given (00:00)", () => {
        const inputHour = 0;
        const inputMinutes = 0;
        const output = 2400;
        expect(convertToRuleScheduleEndTime(inputHour, inputMinutes)).toBe(output);
    });

    test("it should get a equivalent military (1400) end time by given (14:00)", () => {
        const inputHour = 14;
        const inputMinutes = 0;
        const output = 1400;
        expect(convertToRuleScheduleEndTime(inputHour, inputMinutes)).toBe(output);
    });
});

describe("Test util function: getTariffValue", () => {
    test("should get a tariff value by time (MO, EARLY_MORNING)", () => {
        const day = 'MO';
        const time = 'EARLY_MORNING';
        const output = 25;
        expect(getTariffValue(day,time)).toBe(output);
    });

    test("should get throw error when day is not valid (OTHER_NAME, EARLY_MORNING)", () => {
        const day = 'OTHER_NAME';
        const time = 'EARLY_MORNING';
        expect(() => getTariffValue(day,time)).toThrow(Error);
    });

    test("should get throw error when schedule is not valid (SU, OTHER_NAME)", () => {
        const day = 'MO';
        const time = 'OTHER_NAME';
        expect(() => getTariffValue(day,time)).toThrow(Error);
    });

    test("should get throw error when no input strings", () => {
        const day = 'MO';
        expect(() => getTariffValue(day)).toThrow(Error);
    });
});

describe('Test util function: isAllFirstSchedule', () => {
    test("it should be True when time is between (1 - 900)", () => {
        const inputStart = 1;
        const inputEnd = 900;
        expect(isAllFirstSchedule(inputStart, inputEnd)).toBeTruthy();
    });

    test("it should be False when time is between (0 - 900)", () => {
        const inputStart = 0;
        const inputEnd = 900;
        expect(isAllFirstSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when time is (undefined)", () => {
        expect(isAllFirstSchedule()).toBeFalsy();
    });
});

describe('Test util function: isAllSecondSchedule', () => {
    test("it should be True when military time is between (1759 - 1800)", () => {
        const inputStart = 901;
        const inputEnd = 1800;
        expect(isAllSecondSchedule(inputStart, inputEnd)).toBeTruthy();
    });

    test("it should be False when military time is between (901 - 1801)", () => {
        const inputStart = 901;
        const inputEnd = 1801;
        expect(isAllSecondSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when time is (undefined/null)", () => {
        expect(isAllSecondSchedule()).toBeFalsy();
    });
});

describe('Test util function: isAllThirdSchedule', () => {
    test("it should be True when military time is between (1801 - 2400)", () => {
        const inputStart = 1801;
        const inputEnd = 2400;
        expect(isAllThirdSchedule(inputStart, inputEnd)).toBeTruthy();
    });

    test("it should be False when military time is between (18:01 - 00:00)", () => {
        const inputStart = 1801;
        const inputEnd = 0;
        expect(isAllThirdSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when time is (undefined/null)", () => {
        expect(isAllThirdSchedule()).toBeFalsy();
    });
});

describe('Test util function: isInFirstAndSecondSchedule', () => {
    test("it should be True when military time is between (800 - 1000)", () => {
        const inputStart = 800;
        const inputEnd = 1000;
        expect(isInFirstAndSecondSchedule(inputStart, inputEnd)).toBeTruthy();
    });

    test("it should be False when military time is between (901 - 1800)", () => {
        const inputStart = 901;
        const inputEnd = 1800;
        expect(isInFirstAndSecondSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when military time is between (2300 - 1100)", () => {
        const inputStart = 2300;
        const inputEnd = 1100;
        expect(isInFirstAndSecondSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when time is (undefined/null)", () => {
        expect(isInFirstAndSecondSchedule(null)).toBeFalsy();
    });
});

describe('Test util function: isInSecondAndThirdSchedule', () => {
    test("it should be True when military time is between (1400 - 2000)", () => {
        const inputStart = 1400;
        const inputEnd = 2000;
        expect(isInSecondAndThirdSchedule(inputStart, inputEnd)).toBeTruthy();
    });

    test("it should be False when military time is between (2000 - 2100)", () => {
        const inputStart = 2000;
        const inputEnd = 2100;
        expect(isInSecondAndThirdSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when military time is between (2300 - 100)", () => {
        const inputStart = 2300;
        const inputEnd = 100;
        expect(isInSecondAndThirdSchedule(inputStart, inputEnd)).toBeFalsy();
    });

    test("it should be False when time is (undefined/null)", () => {
        expect(isInSecondAndThirdSchedule(null)).toBeFalsy();
    });
});
