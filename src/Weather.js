import React from 'react';

class Weather extends React.Component {
  render() {
    return (
      <>
        {this.props.renderWeather ? this.props.weatherData.map((city, index) => <h3 key={index}>{city.description}</h3>) : ''}
      </>
    )
  }
}

export default Weather;
