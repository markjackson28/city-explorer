import React from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns';
import Container from 'react-bootstrap/Container';

class Movie extends React.Component {
  render() {
    let cardItem = this.props.movieData.map((movie, index) => (
      <Card>
        <Card.Header><h4 key={index}>{movie.title}</h4></Card.Header>
        <Card.Img variant="top" src={movie.img_url} />
        <Card.Body>
          <Card.Title>Movie Description</Card.Title>
          {/* <Card.Title><h4 key={index}>{movie.title}</h4></Card.Title> */}
          <Card.Text>{movie.overview}</Card.Text>
        </Card.Body>
      </Card>
    ));

    return (
      <>
        <Container>
          <CardColumns>
            {cardItem}
          </CardColumns>
        </Container>
      </>
    )
  }
}

export default Movie;
