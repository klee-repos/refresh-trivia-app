

var timeZone = 'local';

var setDayOfWeek = function(dayOfWeek) {
    switch(dayOfWeek) {
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        case 7:
            return 'Sunday'
        default:
            return dayOfWeek
    }
}

var setMonthName = function(month) {
    switch(month) {
        case 1:
            return 'Jan'
        case 2:
            return 'Feb'
        case 3:
            return 'Mar'
        case 4:
            return 'Apr'
        case 5:
            return 'May'
        case 6:
            return 'Jun'
        case 7:
            return 'Jul'
        case 8:
            return 'Aug'
        case 9:
            return 'Sep'
        case 10:
            return 'Oct'
        case 11:
            return 'Nov'
        case 12:
            return 'Dec'
        default:
            return month
    }
}

var date = function(utc, timeZone) {

    var date = {
        month: null,
        day: null,
        year: null,
        dayOfWeek: null,
        monthName: null,
    }

    if (timeZone == 'local') {
        date.month = utc.getMonth();
        date.day = utc.getDate();
        date.dayOfWeek = utc.getDay();
        date.year = utc.getFullYear();
    } else {
        date.month = utc.getUTCMonth();
        date.day = utc.getUTCDate();
        date.dayOfWeek = utc.getUTCDay();
        date.year = utc.getUTCFullYear();
    }

    date.dayOfWeek = setDayOfWeek(date.dayOfWeek);
    date.monthName = setMonthName(date.month);
    
    return date;
}

var setHours = function(hours) {

    if (hours > 10) {
        return hours - 12; 
    }

    switch(hours) {
        case '00':
            return 12
        case '01':
            return 1
        case '02':
            return 2
        case '03':
            return 3
        case '04':
            return 4
        case '05':
            return 5
        case '06':
            return 6
        case '07':
            return 7
        case '08':
            return 8
        case '09':
            return 9
    }

}

var setTimeOfDay = function(hours,timeOfDay) {
    if (hours > 10) {
        return 'pm'
    } else {
        return 'am'
    }
}

var time = function(utc, timezone) {

    var time = {
        hours: null,
        minutes: null,
        seconds: null,
        timeOfDay: null,
    };

    if (timezone == 'local') {
        time.hours = utc.toString().substring(16,18);
    } else {
        time.hours = utc.toUTCString().substring(17,19);
    }
    
    time.hours = setHours(time.hours);

    time.minutes = utc.toUTCString().substring(20,22);
    time.seconds = utc.toUTCString().substring(23,25);

    time.timeOfDay = setTimeOfDay(time.hours,time.timeOfDay)
    return time
}

var TimeDateProvider = function(_io) {
    timeDateSocket = _io.to('time-updates');

    setInterval(function() {
        var utc = new Date();

        timeDateSocket.emit('date',date(utc, timeZone))
        timeDateSocket.emit('time',time(utc, timeZone))

    },1000)
}


module.exports = TimeDateProvider;