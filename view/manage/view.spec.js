const { View } = require('./view');

describe('Test View function: Read data', () => {
    const view = new View();
    test('it should get an string array by given a string path', () => {
        const path = './data/data-valid.txt';
        const output = ["RENE=TU10:0-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00",
            "ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00",
            "BETO=FR08:00-09:30,TU08:00-10:00,WE08:00-11:30",
            "PAOLA=TU13:00-18:00,WE19:00-20:00,FR09:00-16:00",
            "FREY=MO13:00-15:00,FR13:00-15:00",
            ""];
        expect(view.readData(path)).toEqual(output);
    });

    test('it should get object with error by given a incorrect string path', () => {
        const path = '..some-path/data/data-valid.txt';
        const output = {"error": "ENOENT: no such file or directory, open '..some-path/data/data-valid.txt'"};
        expect(view.readData(path)).toEqual(output);
    });
});

describe('Test View function: getScheduleInfo', () => {
    const view = new View();
    test('it should get an string by given ()', () => {
        const input = [
            {day: 'MO', startTime: {hour: 13, minutes: 0}, endTime: {hour: 15, minutes: 0}},
            {day: 'FR', startTime: {hour: 13, minutes: 0}, endTime: {hour: 15, minutes: 0}}
        ];
        const output = ' MO13:00-15:00 | FR13:00-15:00 |';
        expect(view.getScheduleInfo(input)).toEqual(output);
    });
});
