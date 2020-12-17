const { Employee } = require("../objects/employee");

class EmployeeService {

    constructor() {
        this.employees = [];
    }

    create({name, workdays}) {
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
            return employee.id === id;
        });
    }

    /*getAll() {
        return this.employees;
    }*/
}

module.exports = {
    EmployeeService
};
