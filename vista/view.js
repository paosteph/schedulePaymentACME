const fs = require('fs');
const { AppController } = require('../controller/app-controller');

class View {
    constructor() {}

    readData(path) {
        let data;
        try {
            data = fs.readFileSync(path, 'utf8')
            data = data.split('\n');
        } catch (error) {
            console.error(error);
            return;
        }
        return data;
    }

    getEmployeePay(employeesFilePath) {
        const employeeData = this.readData(employeesFilePath);
        const execution = new AppController();
        return execution.getEmployeesPay(employeeData);
    }

    getEmployeePayInformation(employeePayInfo) {
        if (employeePayInfo.error) {
            return `Error! Employee data not processed: ${employeePayInfo.error}`;
        }
        const employeeInfo = employeePayInfo.employee.name + ' = ' + this.getSchedule(employeePayInfo.employee.workdays);
        const pay = `The amount to pay ${employeePayInfo.employee.name} is ${employeePayInfo.pay}`;
        
        return `${employeeInfo}\n${pay}`;
    }

    getSchedule(workdays) {
        return workdays.reduce((schedule, workday) => {
            return schedule + `${workday.day}${workday.startTime}-${workday.endTime} | `;
        }, '');
    }

    showInformation(employeePayInfo) {
        employeePayInfo.forEach((info, index) => {
            console.group(`Employee ${index + 1}`);
            const employeeInfo = this.getEmployeePayInformation(info);
            console.log(employeeInfo + '\n');
            console.groupEnd();
        });
    }

    
}

module.exports = {
    View
}