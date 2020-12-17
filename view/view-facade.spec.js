const { ViewFacade } = require('./view-facade');

describe('Test View Facade function: showEmployeesPayByDataFile', () => {
    const viewClient = new ViewFacade();
    test('it should get undefined y un console log with list of payment by a file path with employees data', () => {
        const inputPath = './data/data-valid.txt';
        expect(viewClient.showEmployeesPayByDataFile(inputPath)).toBeUndefined();
    });

    test('it should throw an error by given incorrect path', () => {
        const inputPath = './bad/data-valid.txt';
        expect(() => viewClient.showEmployeesPayByDataFile(inputPath)).toThrow(Error);
    });
});
