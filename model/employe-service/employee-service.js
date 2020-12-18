const { Employee } = require("../objects/employee");

class EmployeeService {

    constructor() {
        this.employees = [];
    }

    create({name, workdays}) {
        // const id = Date.now() + name.substring(0,2) + Math.round(Math.random() * 10000);
        const id = this.employees.length + 1; // for testing purpose
        const employee = new Employee(id, name);

        workdays.forEach(workday => {
            employee.addWorday(workday.day, workday.startTime, workday.endTime);
        });

        this.employees.push(employee);
        
        return employee;
    }

    get(id) {
        return this.employees.find(employee => {
            return employee.id === id;
        });
    }

}

module.exports = {
    EmployeeService
};
