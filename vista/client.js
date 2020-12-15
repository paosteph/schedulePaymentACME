const { View } = require("./view");

const pathDataValid = '../test-data/data-valid.txt';
const pathDataInvalid = '../test-data/data-invalid.txt';
const pathDataMix = '../test-data/data-mix.txt';

const cliente = new View;
const employeeResponse = cliente.getEmployeePay(pathDataValid);
// const employeeResponse = cliente.getEmployeePay(pathDataInvalid);
// const employeeResponse = cliente.getEmployeePay(pathDataMix);

cliente.showInformation(employeeResponse);