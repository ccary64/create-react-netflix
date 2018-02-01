import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react';
import MainMovieModal from './MainMovieModal';

const baseLargeImageUrl = 'https://image.tmdb.org/t/p/w780'

export default class MainMovie extends Component {

  render () {
    const isQueued = this.props.queue.filter(item => item.tmdbId === this.props.id);
    return (
      <Grid.Column>
        <div style={{position: 'relative'}}>
          <Image src={baseLargeImageUrl + this.props.backdrop_path} centered/>
          <MainMovieModal isQueued={Boolean(isQueued.length)} {...this.props} />
        </div>
      </Grid.Column>
    );
  }
};