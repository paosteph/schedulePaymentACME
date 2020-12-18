const { Time } = require('./time');

class Workday {

	constructor(day, startTime, endTime) {
        this._day = day;
        const start = this.separateTime(startTime);
        this.startTime = new Time(start.hour, start.minutes);
        const end = this.separateTime(endTime);
        this.endTime = new Time(end.hour, end.minutes);
    }

    get day() {
        return this._day;
    }

    separateTime(time) {
	    const [hour, minutes] = time.split(':');
	    return {
	        hour: Number(hour),
            minutes: Number(minutes)
	    };
    }
}

module.exports = {
    Workday
};
