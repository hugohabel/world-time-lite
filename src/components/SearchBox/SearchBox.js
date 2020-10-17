// External Dependencies
import React from 'react';

// Styles
import './SearchBox.styles.css';

// Constants
const WAIT_TIME = 1000;

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            listOfCities: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCitiesNames = this.getCitiesNames.bind(this);
        this.addCity = this.addCity.bind(this);
    }

    componentDidMount() {
        this.timer = null;
    }

    handleInputChange(value) {

        clearTimeout(this.timer);

        this.setState({ 'listOfCities': [] });
        this.setState({ 'value': value });

        this.timer = setTimeout(this.getCitiesNames, WAIT_TIME);
    }

    getCitiesNames() {
        const cityName = this.state.value;
        let listOfCities = this.state.listOfCities;

        if (cityName) {
            fetch(`https://rapidapi.p.rapidapi.com/v1/geo/cities?limit=5&minPopulation=100000&namePrefix=${cityName}`, {
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
                    data.data.forEach((item) => {
                        //listOfCities.push(`${item.city}, ${item.country}`);
                        listOfCities.push(
                            {
                                id: item.wikiDataId,
                                name: item.city,
                                region: item.region,
                                country: item.country
                            }
                        );
                    });

                    this.setState({ 'listOfCities': listOfCities });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }

    addCity(city) {
        this.setState({ 'listOfCities': [] });
        this.setState({ 'value': '' });

        this.props.onAdd(city);
    }

    render() {
        return (
            <form className="search-box">
                <input type="text" value={this.state.value} placeholder="Find city - Press ⏎" onChange={ (e) => this.handleInputChange(e.target.value) } />
                <div className="cities-list">
                    <ul>
                        { this.state.listOfCities && this.state.listOfCities.map((city) => <li onClick={ (e) => this.addCity(city) }>{ `${city.name}, ${city.region}, ${city.country}` }</li> )}
                    </ul>
                </div>
            </form>
        );
    }
}
