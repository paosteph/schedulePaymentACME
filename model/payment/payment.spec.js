const { Payment } = require('./payment');

describe("Test Payment: convertTimeToFractionValue", () => {
    const payment = new Payment();
    test("it should give a fractional value by time (2:45)", () => {
        const input = '2:45';
        const output = 2.75;
        expect(payment.convertTimeToFractionValue(input)).toBe(output);
    });

    test("it should give a fractional value by time (1:20)", () => {
        const input = '1:20';
        const output = 1.33;
        expect(payment.convertTimeToFractionValue(input)).toBeCloseTo(output);
    });

    test("it should give a fractional value by time (0:59)", () => {
        const input = '0:59';
        const output = 1;
        expect(payment.convertTimeToFractionValue(input)).toBe(output);
    });

    test("it should throw error when input is undefined", () => {
        expect(() => payment.convertTimeToFractionValue()).toThrow(Error);
    });

    test("it should throw Error when none input is given ", () => {
        expect(() => payment.convertTimeToFractionValue()).toThrow(Error);
    });
});

describe('Test payment: calculateAmountToPay', () => {
    test('it should get a total value to pay (30) by time worked (2:00) and tariff (15)', () => {
        const workedSchedule = [{
            hours: '2:00',
            tariff: 15
        }];
        const output = 30;
        const payment = new Payment(workedSchedule);
        expect(payment.calculateAmountToPay()).toBe(output);
    });

    test('it should throw Error when array is undefined', () => {
        const payment = new Payment();
        expect(() => payment.calculateAmountToPay()).toThrow(Error);
    });
});
