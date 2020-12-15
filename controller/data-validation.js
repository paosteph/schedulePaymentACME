const { TimeDay } = require("../modelo/constants/times");
const calculateTotalMinutes = require("./functions/calculate-minutes");
const validateMidnightEndTime = require("./functions/change-midnight-end-time");

class DataValidation {
    constructor(employeeData) {
        this.employeeData = employeeData;
        return this.validate();
    }

    validate() {
        const [name,workdays] = this.employeeData.split('=');
        if (!name || !workdays) {
            return {error: 'Invalid data: missing data'};
        }

        return this.validateWorkdaysFormat(workdays);
    }

    validateWorkdaysFormat(workdaysData) {
        const workdays = workdaysData.split(',');

        const everyDayValid = workdays.every(workday => {
            const dayAbbreviation = workday.substr(0,2);
            return this.validateDay(dayAbbreviation);
        });
         
        if (!everyDayValid) {
            return {error: 'Invalid data: Days invalid format'};
        }

        const everyFormatValid = workdays.every(workday => {
            const [start, end] = workday.slice(2).split('-');
            return this.validateTimeFormat(start, end);
        });

        if (!everyFormatValid) {
            return {error: 'Invalid data: Time format invalid'};
        }

        const everyTimesOrderValid = workdays.every(workday => {
            const [start, end] = workday.slice(2).split('-');
            return this.validStartTimeBeforeEndTime(start, end);
        });

        if (!everyTimesOrderValid) {
            return {error: 'Invalid data: Time order invalid'};
        }

        return true;
    }

    validateDay(dayAbbreviation) {
        const validDay = Object.keys(TimeDay).find(key => {
            return key == dayAbbreviation.toUpperCase();
        });
        
        if(!validDay) {
            return false;
        }
        return true;
    }

    validateTimeFormat(startTime, endTime) {
        const timeFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        const validFormat = startTime.match(timeFormat) && endTime.match(timeFormat);
        
        if(!validFormat) {
            return false;
        }
        return true;
    }

    validStartTimeBeforeEndTime(starTime, endTime) {
        let endTimeValidate = validateMidnightEndTime(endTime);

        const start = calculateTotalMinutes(starTime);
        const end = calculateTotalMinutes(endTimeValidate);

        const isStartBeforeEnd = start < end;

        if (!isStartBeforeEnd) {
            return false;
        }
        return true;
    }
}

module.exports = {
    DataValidation
}