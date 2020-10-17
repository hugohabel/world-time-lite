// External Dependencies
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

const getCityDateTime = function(city) {

    return fetch(`https://rapidapi.p.rapidapi.com/v1/geo/cities/${city.id}/dateTime`, {
        'method': 'GET',
        'headers': {
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
            'x-rapidapi-key': 'c5baede715msh421af9752656179p152c75jsnb8e941a23c06'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const dateObj = moment.parseZone(data.data);

            return {
                id: city.id,
                isHome: city.isHome,
                location: {
                    city: city.name,
                    country: city.country
                },
                timeAndDate: {
                    datetime: dateObj.subtract(2, 'hour').format('YYYY-MM-DD[T]HH'),
                    time: dateObj.add(2, 'hour').format('H:mma'),
                    timezone: dateObj.format('z'),
                    date: dateObj.format('ddd, MMM DD'),
                    UTCtimeDifference: dateObj.format('Z')
                }
            };

        })
        .catch(err => {
            console.error(err);
        });
};

const calculateTimezoneDifferences = function(listOfCities) {
    const homeCity = listOfCities.find((city) => {
        return city.isHome;
    });

    return listOfCities.map((city) => {
        return {
            ...city,
            timeDifference: moment.parseZone(homeCity.timeAndDate.datetime).diff(moment.parseZone(city.timeAndDate.datetime), 'hours')
        };
    });
};


export { generateTimeEntries, generateStyles, getCityDateTime, calculateTimezoneDifferences };
