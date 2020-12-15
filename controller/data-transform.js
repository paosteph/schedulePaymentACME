class DataTransform {
    constructor(employeeData) {
        return this.transform(employeeData)
    }

    transform(employeeData) {
        const [name,schedule] = employeeData.split('=');
        
        const workdaysFormated = schedule.split(',').map(workday => {
            const day = workday.substr(0,2).toUpperCase();
            const [startTime, endTime] = workday.slice(2).split('-');
            return {day, startTime, endTime};
        });
        return [name, workdaysFormated];
    }

}

module.exports = {
    DataTransform
}