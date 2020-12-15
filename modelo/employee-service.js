const { Employee } = require("./objetos/employee");
const workday = require("./objetos/workday");

class EmployeeService {
    employees = [];

    constructor() {}

    create(name, workdays) {
        const id = this.employees.length + 1;
        const employee = new Employee(id, name);

        workdays.forEach(workday => {
            employee.addWorday(workday.day, workday.startTime, workday.endTime);
        });

        this.employees.push(employee);
        
        return this.employees[this.employees.length - 1];
    }

    get(id) {
        return this.employees.find(employee => {
            return employee.id == id;
        });
    }

    getAll() {
        return this.employees;
    }
}

module.exports = {
    EmployeeService
}