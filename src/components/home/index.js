import React from 'react'
import { connect } from 'react-redux'
import { Container, Divider } from 'semantic-ui-react'
import Slider from 'react-slick';
import MainMovie from './MainMovie';
import * as movieActions from '../../actions/movies'

const largeSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  arrows: false,
  responsive: [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 2
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
};

const Home = (props) => {
  const addToQueue = (queuedMovie) => props.dispatch(movieActions.addToQueue(queuedMovie));
  const removeFromQueue = (unqueuedMovie) => props.dispatch(movieActions.removeFromQueue(unqueuedMovie))
  return (
    <Container>
    <Slider {...largeSettings}>
      {props.mainMovies.map((movie, index) => (
        <div key={`main-${index}`}>
          <MainMovie
            addToQueue={addToQueue}
            removeFromQueue={removeFromQueue}
            right='200px'
            bottom='10px' 
            color='orange'
            queue={props.list}
            {...movie}
          />
        </div>
      ))}
    </Slider>
    <Divider style={{marginTop: '40px'}}/>
    <Slider {...settings}>
      {props.movies.map((movie, index) => (
        <div key={`movie-${index}`}>
          <MainMovie
            addToQueue={addToQueue}
            removeFromQueue={removeFromQueue}
            right='10px'
            bottom='10px' 
            color='olive'
            queue={props.list}
            {...movie}
          />
        </div>
      ))}
    </Slider>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.popular || [],
    mainMovies: state.movies.mainMovies || [],
    list: state.movies.list || []
  }
};
const ConnectedHome = connect(mapStateToProps)(Home);
export default ConnectedHome