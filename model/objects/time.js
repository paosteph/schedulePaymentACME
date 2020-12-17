class Time {
    constructor(hour, minutes) {
        this._hour = hour;
        this._minutes = minutes;
    }

    get hour() {
        return this._hour;
    }

    get minutes() {
        return this._minutes
    }
}

module.exports = {
    Time
};
