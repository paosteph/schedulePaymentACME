const { View } = require('./manage/view');

class ViewFacade {
    constructor() {
        this.viewManage = new View();
    }

    showEmployeesPayByDataFile(employeesFilePath) {
        const fileData = this.viewManage.readData(employeesFilePath);

        if (fileData.error) throw new Error(fileData.error);

        if (fileData.length === 0) {
            throw new Error('File is empty');
        }
        const createResponse = this.viewManage.createEmployees(fileData);

        if (createResponse.error) throw new Error(createResponse.error);

        createResponse.forEach((employee, index) => {

            console.group(`CASE ${index + 1}`);

            if (employee.error) {
                this.viewManage.showErrorInformation(employee.error);
            } else {
                const response = this.viewManage.getEmployeePay(employee.id);
                if (response.error) {
                    this.viewManage.showErrorInformation(response.error);
                } else {
                    this.viewManage.showEmployeeInformation(response);
                }
            }

            console.groupEnd();

        });
    }
}

module.exports = {
    ViewFacade
};
