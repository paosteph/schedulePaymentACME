const { Workday } = require("./workday");

class Employee {

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.workdays = [];
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
};
