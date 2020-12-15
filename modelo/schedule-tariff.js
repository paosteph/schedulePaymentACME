const {TimeDay, TimeEndSchedule} = require('./constants/times');
const {Tariff} = require('./constants/tariff');
const calculateMinutes = require('../controller/functions/calculate-minutes');
const changeMidnightEndTime = require('../controller/functions/change-midnight-end-time');

class ScheduleTariff {
    constructor(workdays, workedSchedule) {
        this.workdays = workdays;
        this.workedSchedule = workedSchedule;
    }

    calculateTimeWorked(startTime, endTime) {
        const startMinutes = calculateMinutes(startTime);
        let endTimeValidate = changeMidnightEndTime(endTime);
        const endMinutes = calculateMinutes(endTimeValidate);

        const difference = endMinutes - startMinutes;
        const hours = Math.floor(difference / 60);
        const minutes = difference % 60;
        return `${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
    }

    getWorkedSchedule(startTime, endTime) {
        return this.workedSchedule.getWorkedSchedule(startTime, endTime);
    }

    getTariff(day, schedule) {
        const timeDay = TimeDay[day];
        return Tariff[timeDay][schedule];
    }

    getWorkdayTariff(day, startTime, endTime) {
        const [firstSchedule, secondSchedule] = this.getWorkedSchedule(startTime, endTime);
        if (!secondSchedule) {
            return [{
                hours: this.calculateTimeWorked(startTime, endTime),
                tariff: this.getTariff(day, firstSchedule)
            }];
        } else {
            const firstWorkday = {
                hours: this.calculateTimeWorked(startTime, TimeEndSchedule[firstSchedule]),
                tariff: this.getTariff(day, firstSchedule)
            };
            const secondWorkday = {
                hours: this.calculateTimeWorked(TimeEndSchedule[firstSchedule], endTime),
                tariff: this.getTariff(day, secondSchedule)
            };
            return [firstWorkday, secondWorkday];
        }
    }

    getAll() {
        return this.workdays.reduce((allTariffs, workday) => {
            const workdayTariff = this.getWorkdayTariff(workday.day, workday.startTime, workday.endTime);
            allTariffs.push(workdayTariff[0]);

            const existASecondWorkdayTariff = workdayTariff.length == 2;
            if (existASecondWorkdayTariff) {
                allTariffs.push(workdayTariff[1]);
            }

            return allTariffs;
        }, []);
    }

}

module.exports = {
    ScheduleTariff
}