class Payment {
    constructor(workSchedule) {
        this.workSchedule = workSchedule;
    }
    
    calculateAmountToPay() {
        if (!this.workSchedule) throw Error('Workschedule is undefined');
        return this.workSchedule.reduce((total, time) => {
            const pay = this.convertTimeToFractionValue(time.hours) * time.tariff;
            return total + pay;
        }, 0);
    }

    convertTimeToFractionValue(time) {
        if (!time) throw Error('time worked cannot be converted because is empty');
        const [hours, minutes] = time.split(':');
        const almostAnHour = minutes === '59'; // this is because of rules schedule - 09:01 - 10:00
        if (almostAnHour) {
            return Number(hours) + 1;
        } else {
            const proportionMinutes = Math.round(minutes * 100 / 60) / 100;
            return Number(hours) + proportionMinutes;
        }
    }
}

module.exports = {
    Payment
};
