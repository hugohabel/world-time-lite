// External Dependencies
import React from 'react';
import moment from "moment";

// Custom Dependencies
import SearchBox from '../SearchBox/SearchBox';
import Entry from '../Entry/Entry';
import { getCityDateTime } from '../../utils/utils';

// Styles
import './WorldTimeWidget.styles.css';

export default class WorldTimeWidget extends React.Component {
    constructor(props) {
        super(props);

        this.listOfEntries = [
            {
                id: 'Q9022',
                name: 'Guadalajara',
                region: 'Jalisco',
                country: 'Mexico',
                isHome: true
            }, {
                id: 'Q84',
                name: 'London',
                region: 'England',
                country: 'United Kingdom',
                isHome: false
            }, {
                id: 'Q189138',
                name: 'Hermosillo',
                region: 'Sonora',
                country: 'Mexico',
                isHome: false
            }
        ];

        this.state = {
            entries: []
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.calculateTimezoneDifferences = this.calculateTimezoneDifferences.bind(this);
    }

    waitPromise(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(ms);
            }, ms);
        });
    }

    calculateTimezoneDifferences() {
        const homeCity = this.state.entries.find((city) => {
            return city.isHome;
        });

        this.setState((state) => {
            return {
                entries: this.state.entries.map((city) => {
                    return {
                        ...city,
                        timeDifference: moment.parseZone(city.timeAndDate.datetime).diff(moment.parseZone(homeCity.timeAndDate.datetime), 'hours')
                    }
                })
            };
        });
    };

    componentDidMount() {
        const getListOfEntries = async () => {
            for (const entry of this.listOfEntries) {
                getCityDateTime(entry)
                    .then((data) => {
                        let tmpArray = this.state.entries.concat(data);
                        this.setState({ entries: tmpArray });
                    });
                await this.waitPromise(2000); // Hack to avoid making too many requests to the API.
            }
        };

        getListOfEntries().then(() => {
            this.calculateTimezoneDifferences();
        });
    }

    handleAction(entryId) {
        this.setState({entries: this.state.entries.filter(function(entry) {
            return entry.id !== entryId;
        })});
    }

    handleAddition(city) {
        getCityDateTime(city)
            .then((data) => {
                let tmpArray = this.state.entries.concat(data);
                this.setState({ entries: tmpArray });
            })
            .then(() => {
                this.calculateTimezoneDifferences();
            });
    }

    render() {
        return (
            <div className="world-time-widget">
                <SearchBox onAdd={this.handleAddition} />

                { this.state.entries && this.state.entries.map((entry) => <Entry key={entry.id} data={entry} onRemove={this.handleAction} />) }
            </div>
        );
    };
}
