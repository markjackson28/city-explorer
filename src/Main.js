import React from 'react';
import axios from 'axios';
// import Cities from './Cities';
import Weather from './Weather';
import Movies from './Movies';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCity: false,
      cityQuery: '',
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
      renderWeatherHeader: false,
      weatherData: [],
      movieData: [],
      renderMovieData: false,
      renderMovieError: false,
      movieErrorMessage: '',
      renderMovieHeader: false,
    }
  }
  
  handleChange = e => {
    this.setState({
      cityQuery: e.target.value,
    });
  }

  getCityInfo = async (e) => {
    e.preventDefault();

    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.cityQuery}&format=json`);
      let cityMap = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`

      this.setState({
        renderCity: true,
        renderCityImg: true,
        cityMapImg: cityMap,
        renderLatLon: true,
        city: cityResults.data[0].display_name,
        lat: cityResults.data[0].lat,
        lon: cityResults.data[0].lon,
        renderCityError: false,
      });
    } catch (error) {
      this.setState({
        lat: null,
        lon: null,
        renderCityError: true,
        renderCity: false,
        renderCityImg: false,
        renderLatLon: false,
        cityErrorMessage: `Error Occured: ${error.response.status}, ${error.response.data.error}`,
      });
    }
    this.getMovieInfo();
    this.getWeatherInfo();
  }

  getWeatherInfo = async (e) => {
    try {
      let weatherInfo = await axios.get(`http://localhost:3001/weather?lat=${this.state.lat}&lon=${this.state.lon}`);
      console.log(weatherInfo.data);
      this.setState({
        weatherData: weatherInfo.data,
        renderWeather: true,
        renderWeatherError: false,
        renderWeatherHeader: true,
      });
    } catch (error) {
      this.setState({
        renderWeather: false,
        renderWeatherError: true,
        renderWeatherHeader: false,
        renderMovieHeader: false,
        weatherErrorMessage: `Error Occured: ${error.response.status}, ${error.response.data}`,
      });
    }
  }
  
  getMovieInfo = async (e) => {
    try {
      let movieInfo = await axios.get(`http://localhost:3001/movies?city=${this.state.cityQuery}`);
      // console.log(movieInfo);
      this.setState({
        movieData: movieInfo.data,
        renderMovieData: true,
        renderMovieError: false,
        renderMovieHeader: true,
      });
    } catch (error) {
      this.setState({
        renderMovieData: false,
        renderMovieError: true,
        renderMovieHeader: false,
        movieErrorMessage: `Error Occured: ${error.response.status}, ${error.response.result}`,
      });
    }
  }
  
  render() {
    // console.log(this.state);
    // console.log(this.state.weatherErrorMessage);
    // console.log(this.state.movieErrorMessage);
    return (
      <main>
        <Form onSubmit={this.getCityInfo}>
          <Form.Label>Enter in a city!</Form.Label>
          <Form.Control input type="text" placeholder="City" onChange={this.handleChange} />
          <Button onClick={this.getCityInfo}>Explore!</Button>
        </Form>

        {/* Renders city name */}
        {this.state.renderCity ? <h3>City: {this.state.city}</h3> : ''}
        {this.state.renderCityError ? <Alert variant="danger">{this.state.cityErrorMessage}</Alert> : ''}

        {/* Renders city map */}
        {this.state.renderCityImg ? <Image src={this.state.cityMapImg} alt="map" thumbnail /> : ''}

        {/* Renders lat/lon */}
        {this.state.renderLatLon ? <h4>Lat: {this.state.lat} Lon: {this.state.lon}</h4> : ''}

        {/* Renders weather */}
        {this.state.renderWeatherHeader ? <h3>16 Day Forcast</h3> : ''}
        <Weather renderWeather={this.state.renderWeather} weatherData={this.state.weatherData} />
        {this.state.renderWeatherError ? <Alert variant="danger">{this.state.weatherErrorMessage}</Alert> : ''}

        {/* Renders movies */}
        {this.state.renderMovieHeader ? <h3>Movies Related to Your City Search</h3> : ''}
        <Movies renderMovieData={this.state.renderMovieData} movieData={this.state.movieData} />
        {this.state.renderMovieError ? <Alert variant="danger">{this.state.movieErrorMessage}</Alert> : ''}

      </main>
    )
  }
}

export default Main;
