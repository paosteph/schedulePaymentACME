const { Payment } = require("./payment");
const { ScheduleTariff } = require("./schedule-tariff");
const { Schedule } = require('./schedule');

class PayFacade { // es controller??

    constructor() {}

    getEmployeePayAmount(employee) {

        const scheduleRules = new Schedule();
        const scheduleTariffService = new ScheduleTariff(employee.workdays, scheduleRules);
        const workedSchedule = scheduleTariffService.getAll();
        // console.log('facade', workedSchedule);

        const paymentService = new Payment(workedSchedule);

        return paymentService.calculateAmounToPay();
    }

}

module.exports = {
    PayFacade
}