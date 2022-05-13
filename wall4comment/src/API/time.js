const YEAR_MILLI = 31536000000;
const MONTH_MILLI = 2628000000;
const WEEK_MILLI = 604800000;
const DAY_MILLI = 86400000;
const HOUR_MILLI = 3600000;
const MINUTE_MILLI = 60000;
const SECOND_MILLI = 1000;

const timeDiffString = (time1, time2) => {
    const timeDiff = time1 - time2;
    // number of years
    if (parseInt(timeDiff / YEAR_MILLI) > 0) {
        const val = parseInt(timeDiff / YEAR_MILLI);
        return `${val} year${val > 1 ? "s" : ""} ago`;
    }

    // number of months
    if (parseInt(timeDiff / MONTH_MILLI) > 0) {
        const val = parseInt(timeDiff / MONTH_MILLI);
        return `${val} month${val > 1 ? "s" : ""} ago`;
    }

    // number of weeks
    if (parseInt(timeDiff / WEEK_MILLI) > 0) {
        const val = parseInt(timeDiff / WEEK_MILLI);
        return `${val} week${val > 1 ? "s" : ""} ago`;
    }

    // number of days
    if (parseInt(timeDiff / DAY_MILLI) > 0) {
        const val = parseInt(timeDiff / DAY_MILLI);
        return `${val} day${val > 1 ? "s" : ""} ago`;
    }

    // number of hours
    if (parseInt(timeDiff / HOUR_MILLI) > 0) {
        const val = parseInt(timeDiff / HOUR_MILLI);
        return `${val} hour${val > 1 ? "s" : ""} ago`;
    }

    // number of minutes
    if (parseInt(timeDiff / MINUTE_MILLI) > 0) {
        const val = parseInt(timeDiff / MINUTE_MILLI);
        return `${val} minute${val > 1 ? "s" : ""} ago`;
    }

    // number of seconds
    if (parseInt(timeDiff / SECOND_MILLI) > 0) {
        const val = parseInt(timeDiff / SECOND_MILLI);
        return `${val} second${val > 1 ? "s" : ""} ago`;
    }
};

export default timeDiffString;
