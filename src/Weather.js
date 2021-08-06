import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container'

class Weather extends React.Component {
  render() {

    let carouselItem = this.props.weatherData.map((city, index) => (
      <Carousel.Item>
        <Carousel.Caption>
          <h4 key={index}>{city.date}</h4>
          <p>{city.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return (
      <>
        {this.props.renderWeather ?
          <Container>
            <Carousel>
              {carouselItem}
            </Carousel>
          </Container>
          : ''}
      </>
    )
  }
}

export default Weather;

