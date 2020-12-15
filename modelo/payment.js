class Payment {
    constructor(workSchedule) {
        this.workSchedule = workSchedule;
    }
    
    calculateAmounToPay() {
        return this.workSchedule.reduce((total, time) => {
            const pay = this.convertTimeToProportion(time.hours) * time.tariff;
            return total + pay;
        }, 0);
    }

    convertTimeToProportion(time) {
        const [hours, minutes] = time.split(':');
        const almostAnHour = minutes == '59';
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
}