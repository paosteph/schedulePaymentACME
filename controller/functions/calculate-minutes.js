module.exports = (time) => {
    return time.split(':').reduce((hours, minutes) => {
        return Number(hours) * 60 + Number(minutes);
    });
}
