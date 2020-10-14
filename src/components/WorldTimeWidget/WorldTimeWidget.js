// External Dependencies
import React from 'react';

// Custom Dependencies
import SearchBox from '../SearchBox/SearchBox';
import Entry from '../Entry/Entry';

// Styles
import './WorldTimeWidget.styles.css';

export default class WorldTimeWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [
                {
                    id: '0000000001',
                    isHome: true,
                    location: {
                        city: 'Guadalajara',
                        country: 'Mexico'
                    },
                    timeAndDate: {
                        datetime: '2020-09-24T18',
                        time: '8:08pm',
                        timezone: 'CDT',
                        date: 'Thu, Sep 24',
                        timeDifference: 0
                    }
                },
                {
                    id: '0000000002',
                    isHome: false,
                    location: {
                        city: 'London',
                        country: 'England'
                    },
                    timeAndDate: {
                        datetime: '2020-09-25T00',
                        time: '2:08am',
                        timezone: 'BST',
                        date: 'Fri, Sep 25',
                        timeDifference: '+6'
                    }
                },
                {
                    id: '0000000003',
                    isHome: false,
                    location: {
                        city: 'Hermosillo',
                        country: 'Mexico'
                    },
                    timeAndDate: {
                        datetime: '2020-09-24T16',
                        time: '6:08pm',
                        timezone: 'MST',
                        date: 'Thu, Sep 24',
                        timeDifference: '-2'
                    }
                }
            ]
        };

        this.handleAction = this.handleAction.bind(this);
    }

    handleAction(entryId) {
        this.setState({entries: this.state.entries.filter(function(entry) {
            return entry.id !== entryId;
        })});
    }

    render() {
        return (
            <div className="world-time-widget">
                <SearchBox />

                { this.state.entries && this.state.entries.map((entry) => <Entry key={entry.id} data={entry} onRemove={this.handleAction} />) }
            </div>
        );
    };
}
