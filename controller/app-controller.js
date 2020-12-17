const { EmployeeService } = require('../model/employe-service/employee-service');
const { PayFacade } = require('../model/pay-facade/pay-facade');
const { DataTransform } = require('./transform/data-transform');
const { DataValidation } = require('./validation/data-validation');

class AppController {
    constructor() {
        this.employeeService = new EmployeeService();
        this.payFacade = new PayFacade();
    }

    createOneEmployee(plainEmployeeData) {
        const dataValidation = new DataValidation(plainEmployeeData);
        const validation = dataValidation.validate();
        if (validation.error) {
            return validation;
        }
        const dataTransform = new DataTransform(plainEmployeeData);
        const jsonEmployeeData = dataTransform.transform();
        return this.employeeService.create(jsonEmployeeData);
    }

    createEmployees(employeesData) {
        try {
            if (employeesData.length === 0) return {error: 'File is empty'};
            return employeesData.map(employeeData => {
                return this.createOneEmployee(employeeData);
            });
        } catch (e) {
            return {error: e.message.toString()};
        }
    }

    getEmployeePay(employeeId) {
        if (!employeeId) {
            return {error: 'Id is undefined'};
        }
        const employee = this.employeeService.get(employeeId);
        if (employee) {
            return {
                employee,
                pay: this.payFacade.getEmployeePayAmount(employee)
            }
        }
        return {error: 'Employee ID is not registered'};
    }
}

module.exports = {
    AppController
};
