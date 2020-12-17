const fs = require('fs');
const { AppController } = require('../../controller/app-controller');

class View {
    constructor() {
        this.controller = new AppController();
    }

    readData(path) {
        let data;
        try {
            data = fs.readFileSync(path, 'utf8');
            data = data.split('\n');
            /*data = data.map(line => {
                return line !== undefined;
            });*/
        } catch (error) {
            // console.error(error.message);
            return {error: error.message.toString()};
        }
        return data;
    }

    createEmployees(fileData) {
        return this.controller.createEmployees(fileData);
    }

    getEmployeePay(id) {
        return this.controller.getEmployeePay(id);
    }

    showEmployeeInformation(info) {
        const employeeInfo = info.employee.name + ' =' + this.getScheduleInfo(info.employee.workdays);
        const pay = `The amount to pay ${info.employee.name} is ${info.pay}`;
        console.log(`${employeeInfo}\n${pay}`);
    }

    showErrorInformation(errorInfo) {
        console.log(`Error! Employee data not processed -> ${errorInfo}`);
    }

    getScheduleInfo(workdays) {
        return workdays.reduce((schedule, workday) => {
            const startHour = this.getString(workday.startTime.hour);
            const startMinutes = this.getString(workday.startTime.minutes);
            const endHour = this.getString(workday.endTime.hour);
            const endMinutes = this.getString(workday.endTime.minutes);
            return schedule + ` ${workday.day}${startHour}:${startMinutes}-${endHour}:${endMinutes} |`;
        }, '');
    }

    getString(time) {
        return (time < 10 ? 0 : '').toString() + time;
    }
    
}

module.exports = {
    View
};
