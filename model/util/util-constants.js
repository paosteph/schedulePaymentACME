const Tariff = {
    WEEK: {
        EARLY_MORNING: 25,
        DURING_DAY: 15,
        NIGHT: 20
    },
    WEEKEND: {
        EARLY_MORNING: 30,
        DURING_DAY: 20,
        NIGHT: 25
    }
};

const TimeDay = {
    MO: 'WEEK',
    TU: 'WEEK',
    WE: 'WEEK',
    TH: 'WEEK',
    FR: 'WEEK',
    SA: 'WEEKEND',
    SU: 'WEEKEND'
};

const Time = {
    EARLY_MORNING: 'EARLY_MORNING',
    DURING_DAY: 'DURING_DAY',
    NIGHT: 'NIGHT'
};

const TimeRules = {
    EARLY_MORNING: {
        START: 1,
        END: 900
    },
    DURING_DAY: {
        START: 901,
        END: 1800
    },
    NIGHT: {
        START: 1801,
        END: 2400
    }
};

const TimeEndSchedule = {
    EARLY_MORNING: {
        hour: 9,
        minutes: 0
    },
    DURING_DAY: {
        hour: 18,
        minutes: 0
    },
    NIGHT: {
        hour: 0,
        minutes: 0
    }
};

module.exports = {
    TimeDay,
    TimeRules,
    Time,
    TimeEndSchedule,
    Tariff
};
