const { TimeDay } = require("../../model/util/util-constants");
const { calculateMinutes, validateEndTimeFormat } = require("../../model/util/util");

class DataValidation {
    constructor(employeeData) {
        this.employeeData = employeeData;
    }

    validate() {
        try {
            const [name,workdays] = this.employeeData.split('=');
            this.validateExistEmployeeData(name,workdays);
            return this.validateAllWorkdaysFormat(workdays);
        } catch (e) {
            return {error: e.message.toString()};
        }
    }

    validateExistEmployeeData(name, workdays) {
        if (!name || !workdays) {
            throw new Error('Invalid data: missing data');
        }
    }

    validateAllWorkdaysFormat(workdaysData) {
        if (!workdaysData) throw new Error('Invalid data: missing schedule data');
        const workdays = workdaysData.split(',');

        return workdays.every(workday => {
            return this.validateOneWorkdayFormat(workday);
        });
    }

    validateOneWorkdayFormat(workday) {
        const dayAbbreviation = workday.substr(0,2);
        this.validateDay(dayAbbreviation);

        const [start, end] = workday.slice(2).split('-');
        this.validateTimeFormat(start, end);

        return this.validStartTimeBeforeEndTime(start, end);
    }

    validateDay(dayAbbreviation) {
        if (dayAbbreviation) {
            const validDayAbbreviation = Object.keys(TimeDay).find(key => {
                return key === dayAbbreviation.toUpperCase();
            });
            if (!validDayAbbreviation) throw new Error('Invalid data: Days invalid format');
            return true;
        }
        throw new Error('Invalid data: Day invalid format');
    }

    validateTimeFormat(startTime, endTime) {
        if (startTime && endTime) {
            const timeFormat = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
            const validFormat = startTime.match(timeFormat) && endTime.match(timeFormat);
            if (!validFormat) throw new Error('Invalid data: Time data format not valid');
            return true;
        }
        throw new Error('Invalid data: missing time data');
    }

    validStartTimeBeforeEndTime(starTime, endTime) {
        if (starTime && endTime) {
            const [startHour, startMinutes] = starTime.split(':');
            const [endHour, endMinutes] = endTime.split(':');
            let [endTimeHour, endTimeMinutes] = validateEndTimeFormat(parseInt(endHour), parseInt(endMinutes));
            const start = calculateMinutes(parseInt(startHour), parseInt(startMinutes));
            const end = calculateMinutes(endTimeHour, endTimeMinutes);
            const startIsLessThanEnd = start < end;
            if (!startIsLessThanEnd)
                throw new Error('Invalid data: Time data order not valid, start time should be lower than end time');
            return true;
        }
        throw new Error('Invalid data: missing time data');
    }
}

module.exports = {
    DataValidation
};
