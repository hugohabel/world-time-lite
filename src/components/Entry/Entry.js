// External Dependencies
import React from 'react';

// Custom Dependencies
import EntryDetails from '../EntryDetail/EntryDetail';
import EntryActions from '../EntryActions/EntryActions';
import EntryTimes from '../EntryTimes/EntryTimes';

// Styles
import './Entry.styles.css';

function Entry(props) {
    return (
        <div className="entry">
            <EntryActions data={props.data} onRemove={props.onRemove} />
            <EntryDetails data={props.data} />
            <EntryTimes data={props.data} />
        </div>
    );
}

export default Entry;
