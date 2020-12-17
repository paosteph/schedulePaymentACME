const { Tariff, TimeDay, TimeRules } = require('./util-constants');

const calculateMinutes = (hours, minutes) => {
    if (hours === undefined || minutes === undefined) throw Error('Hour and/or minutes cannot be empty');
    return hours * 60 + minutes;
};

const validateEndTimeFormat = (hour, minutes) => {
    if (hour === undefined || minutes === undefined) throw Error('Hour and/or minutes cannot be empty');
    const isMidnightTime = hour === 0 && minutes === 0;

    if (isMidnightTime) {
        return [24,0];
    }
    return [hour, minutes];
};

const calculateTimeWorked = (startHours, startMinutes, endHours, endMinutes) => {
    if (startHours === undefined || startMinutes === undefined || endHours === undefined || endMinutes === undefined)
        throw Error('At calculated time worked arguments cannot be empty');
    if (typeof startHours != "number" || typeof startMinutes != "number" || typeof endHours != "number" || typeof endMinutes != "number")
        throw Error('At calculated time worked arguments can only be numbers');

    const start = calculateMinutes(startHours, startMinutes);
    const [newEndHours, newEndMinutes] = validateEndTimeFormat(endHours, endMinutes);
    const end = calculateMinutes(newEndHours, newEndMinutes);

    const difference = end - start;
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    return `${hours}:${getStringMinutes(minutes)}`;
};

const getStringMinutes = (minutes) => {
    return (minutes < 10 ? 0 : '').toString() + minutes;
};

const convertToRuleScheduleStartTime = (hour, minutes) => {
    if (hour === undefined || minutes === undefined) throw Error('Hour or minutes cannot be undefined');
    if (typeof hour != "number" || typeof minutes != "number") throw Error('Hour or minutes should be a number');
    const isTimeOClock = minutes == 0;
    let newMinutes = minutes;
    if (isTimeOClock) {
        newMinutes = 1;
    }
    return Number([hour, getStringMinutes(newMinutes)].join(''));
};

const convertToRuleScheduleEndTime = (hour, minutes) => {
    if (hour === undefined || minutes === undefined) throw Error('Hour or minutes cannot be undefined');
    if (typeof hour != "number" || typeof minutes != "number") throw Error('Hour or minutes should be a number');
    const endIsMidnight = hour == 0 && minutes == 0;
    let newHour = hour;
    if (endIsMidnight) {
        newHour = 24;
    }
    return Number([newHour, getStringMinutes(minutes)].join(''));
};

const getTariffValue = (day, schedule) => {
    if (!(day || schedule)) throw Error("day or schedule cannot be empty");
    const timeDay = TimeDay[day];
    if (!timeDay) throw Error("input day is not valid");
    const tariff =  Tariff[timeDay][schedule];
    if (!tariff) throw Error("schedule/time rule is not valid");
    return tariff;
};

const isInFirstSchedule = (time) => {
    return time >= TimeRules.EARLY_MORNING.START && time <= TimeRules.EARLY_MORNING.END;
};

const isInSecondSchedule = (time) => {
    return time >= TimeRules.DURING_DAY.START && time <= TimeRules.DURING_DAY.END;
};

const isInThirdSchedule = (time) => {
    return time >= TimeRules.NIGHT.START && time <= TimeRules.NIGHT.END;
};

const isAllFirstSchedule = (start, end) => {
    return isInFirstSchedule(start) && isInFirstSchedule(end);
};

const isAllSecondSchedule = (start, end) => {
    return isInSecondSchedule(start) && isInSecondSchedule(end);
};

const isAllThirdSchedule = (start, end) => {
    return isInThirdSchedule(start) && isInThirdSchedule(end);
};

const isInFirstAndSecondSchedule = (start, end) => {
    return isInFirstSchedule(start) && isInSecondSchedule(end);
};

const isInSecondAndThirdSchedule = (start, end) => {
    return isInSecondSchedule(start) && isInThirdSchedule(end);
};

module.exports = {
    calculateMinutes,
    calculateTimeWorked,
    getTariffValue,
    validateEndTimeFormat,
    convertToRuleScheduleStartTime,
    convertToRuleScheduleEndTime,
    isAllFirstSchedule,
    isAllSecondSchedule,
    isAllThirdSchedule,
    isInFirstAndSecondSchedule,
    isInSecondAndThirdSchedule
};
