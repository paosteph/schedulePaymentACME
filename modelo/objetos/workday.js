class Workday {

	constructor(day, startTime, endTime) {
        this._day = day;
        this._startTime = startTime,
        this._endTime = endTime;
    }

    getWorkday() {
        return `${this._day}${this._startTime}-${this._endTime}`;
    }

    get day() {
        return this._day;
    }

    get startTime() {
        return this._startTime;
    }

    get endTime() {
        return this._endTime;
    }
}

module.exports = {
    Workday
}
