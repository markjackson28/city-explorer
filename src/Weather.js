import React from 'react';
import WeatherDay from './WeatherDay';


class Weather extends React.Component {
  render() {

    return (
      <>
        {this.props.renderWeather ? <WeatherDay weatherData={this.props.weatherData} /> : '' }
      </>
    )
  }
}

export default Weather;

