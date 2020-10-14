import moment from 'moment';

const generateTimeEntries = function(startDate) {
    startDate = moment(startDate);
    let timeEntries = [];

    for (let i = 0; i <= 20; i++) {
        let placeholder = startDate.add(1, 'hour');

        if (placeholder.format('a') === 'am' && placeholder.format('h') === '12') {
            timeEntries.push({
                main: placeholder.format('MMM'),
                secondary: placeholder.format('D')
            });
        } else {
            timeEntries.push({
                main: placeholder.format('h'),
                secondary: placeholder.format('a')
            });
        }
    }

    return timeEntries;
}

const generateStyles = function(timeEntry) {
    let styles = 'gray';
    let hour = parseInt(timeEntry.main, 10);

    if (timeEntry.secondary === 'am') {
        if (hour >= 1 && hour <= 5) {
            styles = 'dark-blue';
        } else if (hour === 12) {
            styles = 'dark-blue';
        } else if (hour === 6 || hour === 7) {
            styles = 'light-blue';
        }
    } else if (timeEntry.secondary === 'pm') {
        if (hour >= 6 && hour <= 8) {
            styles = 'light-blue';
        } else if (hour === 9 || hour === 10) {
            styles = 'dark-blue';
        } else if (hour === 11) {
            styles = 'dark-blue end';
        }
    } else {
        styles = 'dark-blue start'
    }



    return styles;
}

export { generateTimeEntries, generateStyles };
