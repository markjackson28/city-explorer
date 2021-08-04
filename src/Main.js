import React from 'react';
import axios from 'axios';
// import Cities from './Cities';
import Weather from './Weather';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Main extends React.Component {
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
      renderCityError: false,
      cityErrorMessage: '',
      weatherErrorMessage: '',
      renderWeatherError: false,
      renderWeather: false,
      weatherData: [],
    }
  }

  handleChange = e => {
    this.setState({
      city: e.target.value,
    });
  }

  getCityInfo = async (e) => {
    e.preventDefault();

    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`
      // let weatherInfo = await axios.get(`http://localhost:3001/weather?city=${this.state.city}`);

      this.setState({
        renderCity: true,
        renderCityImg: true,
        cityMapImg: cityMap,
        renderLatLon: true,
        // city: cityResults.data[0].display_name,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        renderCityError: false,
        // weatherData: weatherInfo.data,
        // renderWeather: true,
      });
    } catch (error) {
      this.setState({
        renderCityError: true,
        renderCity: false,
        renderCityImg: false,
        renderLatLon: false,
        cityErrorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`,
      });
    }
    this.getWeatherInfo();
  }

  getWeatherInfo = async (e) => {
    try {
      let weatherInfo = await axios.get(`http://localhost:3001/weather?city=${this.state.city}`);

      this.setState({
        weatherData: weatherInfo.data,
        renderWeather: true,
        renderWeatherError: false,
      });
    } catch (error) {
      this.setState({
        renderWeather: false,
        renderWeatherError: true,
        weatherErrorMessage: `Error Occured: ${error.response.status}, ${error.response.data}`,
      });
    }
  }

  render() {
    return (
      <main>
        <Form onSubmit={this.getCityInfo}>
          <Form.Label>Enter in a city to view the map!</Form.Label>
          <Form.Control input type="text" placeholder="Enter a City" onChange={this.handleChange} />
          <Button onClick={this.getCityInfo}>Explore!</Button>
        </Form>
        {this.state.renderCity ? <h3>City: {this.state.city}</h3> : ''}
        {this.state.renderCityImg ? <Image src={this.state.cityMapImg} alt="map" rounded /> : ''}
        <Weather renderWeather={this.state.renderWeather} weatherData={this.state.weatherData} />
        {this.state.renderLatLon ? <h4>Lat: {this.state.lat} Lon: {this.state.lon}</h4> : ''}
        {this.state.renderCityError ? <Alert variant="danger">{this.state.cityErrorMessage}</Alert> : ''}
        {this.state.renderWeatherError ? <Alert variant="danger">{this.state.weatherErrorMessage}</Alert> : ''}
      </main>
    )
  }
}

export default Main;
