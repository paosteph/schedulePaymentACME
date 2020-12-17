class DataTransform {
    constructor(employeeData) {
        this.employeeData = employeeData;
    }

    transform() {
        if (!this.employeeData) throw new Error('Error: Employee data missing');
        const [name,schedule] = this.employeeData.split('=');
        
        const workdays = schedule.split(',').map(workday => {
            const day = workday.substr(0,2).toUpperCase();
            const [startTime, endTime] = workday.slice(2).split('-');
            return {day, startTime, endTime};
        });
        return {
            name,
            workdays
        };
    }

}

module.exports = {
    DataTransform
};
