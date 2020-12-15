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
}

const TimeHour = {
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
}

const TimeEndSchedule = {
    EARLY_MORNING: '9:00',
    DURING_DAY: '18:00',
    NIGHT: '00:00'
}

module.exports = {
    TimeDay,
    TimeHour,
    Time,
    TimeEndSchedule
}