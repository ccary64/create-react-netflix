import React, { Component } from 'react'
import { Button, Image, Transition, Grid } from 'semantic-ui-react'

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove = () => {
    const { tmdbId } = this.props.value;
    this.props.removeMovie(tmdbId);
  }

  render() {
    return (
      <Transition duration={{ hide: 500, show: 500 }} visible={true}>
        <Grid.Column>
          <div style={{position: 'relative'}}>
            <Image src={this.props.value.poster} />
            <Button
              color='red'
              content='Remove'
              onClick={this.handleRemove}
              style={{position: 'absolute', right: '10px', bottom:'10px'}} />
          </div>
        </Grid.Column>
      </Transition>
    )
  }
}

