const {TimeEndSchedule, Time} = require('../util/util-constants');
const fn = require('../util/util');

class ScheduleTariff {
    constructor(workdays) {
        this.workdays = workdays;
    }

    getWorkdayTariff(day, startTime, endTime) {
        const [firstSchedule, secondSchedule] = this.getWorkedSchedule(startTime, endTime);
        if (!secondSchedule) {
            return [this.createWorkdayTariff(startTime, endTime, day, firstSchedule)];
        } else {
            const first = this.createWorkdayTariff(startTime, TimeEndSchedule[firstSchedule], day, firstSchedule);
            const second = this.createWorkdayTariff(TimeEndSchedule[firstSchedule], endTime, day, secondSchedule);
            return [first, second];
        }
    }

    getWorkedSchedule(startTime, endTime) {
        if (!startTime || !endTime) throw Error('Start or end time are undefined');
        const startFormatted = fn.convertToRuleScheduleStartTime(startTime.hour, startTime.minutes);
        const endFormatted = fn.convertToRuleScheduleEndTime(endTime.hour, endTime.minutes);

        if (fn.isAllFirstSchedule(startFormatted, endFormatted)) {
            return [Time.EARLY_MORNING];
        } else if (fn.isInFirstAndSecondSchedule(startFormatted, endFormatted)) {
            return [Time.EARLY_MORNING, Time.DURING_DAY];
        } else if (fn.isAllSecondSchedule(startFormatted, endFormatted)) {
            return [Time.DURING_DAY];
        } else if (fn.isInSecondAndThirdSchedule(startFormatted, endFormatted)) {
            return [Time.DURING_DAY, Time.NIGHT];
        } else if (fn.isAllThirdSchedule(startFormatted, endFormatted)) {
            return [Time.NIGHT];
        }
    }

    createWorkdayTariff(startTime, endTime, day, tariffSchedule) {
        if (!startTime || !endTime || !day || !tariffSchedule) throw Error('At created work tariff any argument cannot be empty');
        return {
            hours: fn.calculateTimeWorked(startTime.hour, startTime.minutes, endTime.hour, endTime.minutes),
            tariff: fn.getTariffValue(day, tariffSchedule)
        }
    }

    getAll() {
        if (!this.workdays || !this.workdays.length) throw Error('workdays cannot be empty or undefined');
        return this.workdays.reduce((allTariffs, workday) => {
            const [firstWorkdayTariff, secondWorkdayTariff] = this.getWorkdayTariff(workday.day, workday.startTime, workday.endTime);

            allTariffs.push(firstWorkdayTariff);

            if (secondWorkdayTariff) {
                allTariffs.push(secondWorkdayTariff);
            }
            return allTariffs;
        }, []);
    }
}

module.exports = {
    ScheduleTariff
};
