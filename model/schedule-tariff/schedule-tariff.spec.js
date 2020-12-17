const { ScheduleTariff } = require('./schedule-tariff');

describe('Test Schedule tariff function: getWorkdayTariff', () => {
    const scheduleTariff = new ScheduleTariff();
    test('it should give a one worked tariff given (MO, 13:00, 15:00)', () => {
        const inputDay = 'MO';
        const inputStartTime = {hour: 13, minutes: 0};
        const inputEndTime = {hour: 15, minutes: 0};
        const output = [{
            hours: '2:00',
            tariff: 15
        }];
        expect(scheduleTariff.getWorkdayTariff(inputDay, inputStartTime, inputEndTime)).toEqual(output);
    });

    test('it should give a two worked tariffs given (MO, 17:30 - 19:30)', () => {
        const inputDay = 'MO';
        const inputStartTime = {hour: 17, minutes: 30};
        const inputEndTime = {hour: 19, minutes: 30};
        const output = [
            {hours: '0:30', tariff: 15},
            {hours: '1:30', tariff: 20}
        ];
        expect(scheduleTariff.getWorkdayTariff(inputDay, inputStartTime, inputEndTime)).toEqual(output);
    });

    test('it should give a throw error given (MO, 17:30 - 19:30) as string', () => {
        const inputDay = 'MO';
        const inputStartTime = {hour: '17', minutes: '0'};
        const inputEndTime = {hour: 19, minutes: 0};
        expect(() => scheduleTariff.getWorkdayTariff(inputDay, inputStartTime, inputEndTime)).toThrow(Error);
    });

    test('it should throw error if any argument is undefined', () => {
        const inputDay = 'MO';
        const inputStartTime = {};
        expect(() => scheduleTariff.getWorkdayTariff(inputDay, inputStartTime, inputStartTime)).toThrow(Error);
    });
});

describe('Test Schedule tariff function: getWorkedSchedule', () => {
    const scheduleTariff = new ScheduleTariff();
    test('it should get a array string schedule by given (06:00 - 07:00) as numbers', () => {
        const inputStartTime = {hour: 6, minutes: 0};
        const inputEndTime = {hour: 7, minutes: 0};
        const output = ['EARLY_MORNING'];
        expect(scheduleTariff.getWorkedSchedule(inputStartTime, inputEndTime)).toEqual(output);
    });

    test('it should throw error by given (06:00 - 07:00) as string', () => {
        const inputStartTime = {hour: '6', minutes: '0'};
        const inputEndTime = {hour: 7, minutes: 0};
        expect(() => scheduleTariff.getWorkedSchedule(inputStartTime, inputEndTime)).toThrow(Error);
    });

    test('it should get a array with 2 strings schedule by given (06:00 - 10:00)', () => {
        const inputStartTime = {hour: 6, minutes: 0};
        const inputEndTime = {hour: 10, minutes: 0};
        const output = ['EARLY_MORNING', 'DURING_DAY'];
        expect(scheduleTariff.getWorkedSchedule(inputStartTime, inputEndTime)).toEqual(output);
    });

    test('it should throw error by some undefined input', () => {
        const inputStartTime = {hour: 6, minutes: 0};
        const inputEndTime = {};
        expect(() => scheduleTariff.getWorkedSchedule(inputStartTime, inputEndTime)).toThrow(Error);
    });
});

describe('Test Shedule tariff function: createWorkdayTariff', () => {
    const scheduleTariff = new ScheduleTariff();
    test('it should get one workday by given (13:00-14:00, MO, EARLY_MORNING)', () => {
       const inputStartTime = {hour: 13, minutes: 0};
       const inputEndTime = {hour: 14, minutes: 0};
       const day = 'SU';
       const tariffSchedule = 'EARLY_MORNING';
       const output = {hours: '1:00', tariff: 30};
       expect(scheduleTariff.createWorkdayTariff(inputStartTime, inputEndTime, day, tariffSchedule)).toEqual(output);
   });

    test('it should throw error given (13:00-14:00 as strings, MO, EARLY_MORNING)', () => {
        const inputStartTime = {hour: '13', minutes: '0'};
        const inputEndTime = {hour: '14', minutes: '0'};
        const day = 'SU';
        const tariffSchedule = 'EARLY_MORNING';
        expect(() => scheduleTariff.createWorkdayTariff(inputStartTime, inputEndTime, day, tariffSchedule)).toThrow(Error);
    });

    test('it should throw error given some undefined argument (13:00, 14:00, , EARLY_MORNING)', () => {
        const inputStartTime = {hour: '13', minutes: '0'};
        const inputEndTime = {};
        const day = 'SU';
        const tariffSchedule = 'EARLY_MORNING';
        expect(() => scheduleTariff.createWorkdayTariff(inputStartTime, inputEndTime, day, tariffSchedule)).toThrow(Error);
    });
});

describe('Test Schedule tariff function: getAll', () => {
    test('it should throw error when constructor array argument is undefined', () => {
        const workdays = undefined;
        const scheduleTariff = new ScheduleTariff(workdays);
        expect(() => scheduleTariff.getAll()).toThrow(Error);
    });

    test('it should throw error when constructor array argument is empty', () => {
        const workdays = [];
        const scheduleTariff = new ScheduleTariff(workdays);
        expect(() => scheduleTariff.getAll()).toThrow(Error);
    });

    test('it should get an array with workday tariff info', () => {
        const workdays = [
            {day: 'WE', startTime: {hour: 20, minutes: 30}, endTime: {hour: 22, minutes: 0}}
        ];
        const scheduleTariff = new ScheduleTariff(workdays);
        const output = [
            {hours: '1:30', tariff: 20}
        ];
        expect(scheduleTariff.getAll()).toEqual(output);
    });
});
