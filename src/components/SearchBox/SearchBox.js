// External Dependencies
import React from 'react';

// Styles
import './SearchBox.styles.css';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };
    }

    render() {
        return (
            <form className="search-box">
                <input type="text" placeholder="Find city - Press ⏎" />
            </form>
        );
    }
}
