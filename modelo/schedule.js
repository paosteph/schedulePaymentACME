const { TimeHour, Time } = require("./constants/times");

class Schedule {
    constructor() {}

    convertToEquivalentMilitaryTime(startTime, endTime) {
        let [startHours, startMinutes] = startTime.split(':');
        let [endHours, endMinutes] = endTime.split(':');
        // rules to compare next
        const startIsTimeOClock = startMinutes == '00';
        if (startIsTimeOClock) {
            startMinutes = '01';
        }
        const start = Number(startHours + startMinutes);

        const endIsMiddleNight = endHours == '00' && endMinutes == '00';
        if (endIsMiddleNight) {
            endHours = '24';
        }
        const end = Number(endHours + endMinutes);

        return [start, end];
    }

    getWorkedSchedule(startTime, endTime) {
        const [start, end] = this.convertToEquivalentMilitaryTime(startTime, endTime);

        if (this.isAllFirstSchedule(start, end)) {
            return [Time.EARLY_MORNING];
        } else if (this.isInFirstAndSecondSchedule(start, end)) {
            return [Time.EARLY_MORNING, Time.DURING_DAY];
        } else if (this.isAllSecondSchedule(start, end)) {
            return [Time.DURING_DAY];
        } else if (this.isInSecondAndThirdSchedule(start, end)) {
            return [Time.DURING_DAY, Time.NIGHT];
        } else if (this.isAllThirdSchedule(start, end)) {
            return [Time.NIGHT];
        }      
    }

    isAllFirstSchedule(start, end) {
        return start <= TimeHour.EARLY_MORNING.END && end <= TimeHour.EARLY_MORNING.END;
    }

    isAllSecondSchedule(start, end) {
        return start <= TimeHour.DURING_DAY.END && end <= TimeHour.DURING_DAY.END;
    }

    isAllThirdSchedule(start, end) {
        return start <= TimeHour.NIGHT.END && end <= TimeHour.NIGHT.END;
    }

    isInFirstAndSecondSchedule(start, end) {
        return start <= TimeHour.EARLY_MORNING.END && (end > TimeHour.EARLY_MORNING.END && end <= TimeHour.DURING_DAY.END);
    }

    isInSecondAndThirdSchedule(start, end) {
        return start <= TimeHour.DURING_DAY.END && (end > TimeHour.DURING_DAY.END && end <= TimeHour.NIGHT.END);
    }

}

module.exports = {
    Schedule
}