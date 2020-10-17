// External Dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Styles
import './EntryDetails.styles.css';

function EntryDetails(props) {
    return (
        <div className="entry-details">
            <span>
                { props.data.isHome && <FontAwesomeIcon icon={faHome} /> }

                { !props.data.isHome && props.data.timeDifference && `${props.data.timeDifference}` }
            </span>

            <div className="entry-details__place">
                <p className="title">{ props.data.location.city }</p>
                <p className="subtitle">{ props.data.location.country }</p>
            </div>

            <div className="entry-details__time">
                <p className="title">{ `${props.data.timeAndDate.time}` }</p>
                <p className="subtitle">{ props.data.timeAndDate.date }</p>
            </div>
        </div>
    );
}

export default EntryDetails;
