const { Payment } = require("../payment/payment");
const { ScheduleTariff } = require("../schedule-tariff/schedule-tariff");

class PayFacade {

    constructor() {}

    getEmployeePayAmount(employee) {
        const scheduleTariffService = new ScheduleTariff(employee.workdays);
        const workedSchedule = scheduleTariffService.getAll();
        const paymentService = new Payment(workedSchedule);
        return paymentService.calculateAmountToPay();
    }

}

module.exports = {
    PayFacade
};
