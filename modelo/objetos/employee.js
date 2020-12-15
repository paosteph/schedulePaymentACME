const { Workday } = require("./workday");

class Employee {
    workdays = [];

    constructor(id, name){
        this.id = id;
        this.name = name;
    }

    addWorday(day, startTime, endTime) {
        const workday = new Workday(day, startTime, endTime);
        this.workdays.push(workday);
    }

    getEmployee() {
        return this;
    }


}

module.exports = {
    Employee
}
