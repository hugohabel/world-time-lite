// External Dependencies
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

// Styles
import './EntryActions.styles.css';

function EntryActions(props) {
    return (
        <div className="entry-actions" onClick={ () => props.onRemove(props.data.id) }>
            <FontAwesomeIcon icon={faTrash} />
        </div>
    );
}

export default EntryActions;
