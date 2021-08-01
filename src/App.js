import React from 'react';
import axios from 'axios'
import Location from './Location'
import Header from './Header'
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCity: false,
      city: '',
      renderCityImg: false,
      cityMapImg: '',
      renderLatLon: false,
      lat: 0,
      lon: 0,
      renderError: false,
      errorMessage: '',
      // renderWeather: false,
      // weatherData: '',
    }
  }

  handleChange = e => {
    this.setState({ city: e.target.value })
  }

  getCityInfo = async (e) => {
    e.preventDefault();

    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`
      // let weatherInfo = await axios.get(`http://localhost:3001/weather`);
      // console.log(weatherInfo);

      this.setState({
        renderCity: true,
        renderCityImg: true,
        cityMapImg: cityMap,
        renderLatLon: true,
        city: cityResults.data[0].display_name,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        renderError: false,
        // renderWeather: true,
        // weatherData: weatherInfo.data,
      });
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`,
      })
    }
  }

  render() {
    return (
      <>
        <Header />
        <Location />
        <Form onSubmit={this.getCityInfo}>
          <Form.Label>Enter in a city to view the map!</Form.Label>
          <Form.Control input type="text" placeholder="Enter a City" onChange={this.handleChange} />
          <Button onClick={this.getCityInfo}>Explore!</Button>
        </Form>
        {this.state.renderCity ? <h3>City: {this.state.city}</h3> : ''}
        {this.state.renderCityImg ? <Image src={this.state.cityMapImg} alt="map" rounded /> : ''}
        {/* {this.state.weatherData.length !== 0 ? this.state.weatherData.map(weather => <h4>{weather.city_name}</h4>) : ''} */}
        {/* {this.state.renderWeather ? <h4>{this.state.weatherData}</h4> : ''} */}
        {this.state.renderLatLon ? <h4>Lat: {this.state.lat} Lon: {this.state.lon}</h4> : ''}
        {this.state.renderError ? <Alert variant="danger">{this.state.errorMessage}</Alert> : ''}
      </>
    )
  }
}

export default App;
