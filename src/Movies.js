import React from 'react';
import Movie from './Movie'


class Movies extends React.Component {
  render() {
    return (
      <>
        {this.props.renderMovieData ? <Movie movieData={this.props.movieData}/> : ''}
      </>
    )
  }
}

export default Movies;
