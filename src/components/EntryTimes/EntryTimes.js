// External Dependencies
import React from 'react';

// Custom Dependencies
import { generateStyles, generateTimeEntries } from '../../utils/utils';

// Styles
import './EntryTimes.styles.css';

function EntryTimes(props) {
    const timeEntries = generateTimeEntries(props.data.timeAndDate.datetime);

    return (
        <div className="entry-times">
            <ul>
                { timeEntries &&  timeEntries.map((timeEntry, index) => {
                    let styles = generateStyles(timeEntry);
                    styles += index === 1 ? ' current-time' : '';

                    return <li className={styles}>{ timeEntry.main } <span>{ timeEntry.secondary }</span></li>;
                }) }
            </ul>
        </div>
    );
}

export default EntryTimes;
