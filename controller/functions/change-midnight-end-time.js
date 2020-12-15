module.exports = (endTime) => {
    const isMidnightTime = endTime == '00:00';

    if (isMidnightTime) {
        return '24:00';
    }
    
    return endTime;
}