const {EmployeeService} = require('../modelo/employee-service');
const { PayFacade } = require('../modelo/pay-facade');
const { DataTransform } = require('./data-transform');
const { DataValidation } = require('./data-validation');

class AppController {
    constructor() {
        this.employeeService = new EmployeeService();
        this.payFacade = new PayFacade();
    }

    createEmployee(employeeData) {
        const validationEmployeeData = new DataValidation(employeeData);
        if (validationEmployeeData.error) {
            return validationEmployeeData;
        }

        const dataFormated = new DataTransform(employeeData);

        return this.employeeService.create(...dataFormated);
    }

    registerEmployees(employeesData) {
        return employeesData.map(employeeData => {
            return this.createEmployee(employeeData);
        });
    }

    getEmployeesPayAmount(employees) {
        return employees.map(employee => {
            return this.payFacade.getEmployeePayAmount(employee);
        });
    }

    getEmployeesPay(data) { // facade
        const createdEmployeeResponse = this.registerEmployees(data);

        return createdEmployeeResponse.map(employeeResponse => {
            if (employeeResponse.error) {
                return employeeResponse;
            }
            const response = {
                employee: employeeResponse.getEmployee(),
                pay: this.payFacade.getEmployeePayAmount(employeeResponse)
            };
            return response;
        });
    }
}

module.exports = {
    AppController
}
