import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

class WeatherDay extends React.Component {
  render() {

    let carouselItem = this.props.weatherData.map((city, index) => (
      <Carousel.Item>
        <Carousel.Caption>
          <h4 key={index}>{city.time}</h4>
          <p>{city.forecast}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))

    return (
      <>
        <Container>
          <Carousel>
            {carouselItem}
          </Carousel>
        </Container>
      </>
    )
  }
}

export default WeatherDay;
