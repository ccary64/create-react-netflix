import React, { Component } from 'react'
import { Image, Button, Modal, Header } from 'semantic-ui-react'
import './MainMovieModal.css';

const baseImageUrl = 'https://image.tmdb.org/t/p/w500/';

export default class MainMovieModal extends Component {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })
  addToQueue = () => {
    const queuedMovie = {
      tmdbId: this.props.id,
      title: this.props.title,
      overview: this.props.overview,
      poster: baseImageUrl + this.props.poster_path,
    }
    this.props.addToQueue(queuedMovie);
    this.setState({ open: false });
  }

  removeFromQueue = () => {
    this.props.removeFromQueue(this.props.id);
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state
    return (
      <Modal
        dimmer={false}
        open={open}
        onOpen={this.open}
        onClose={this.close}
        className='modal_fadeIn'
        closeOnDocumentClick={true}
        trigger={
          <Button
            color={this.props.color}
            icon='film'
            content='view'
            style={{position: 'absolute', right: this.props.right, bottom: this.props.bottom}}
            />
          }
        >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size='medium' 
            src={baseImageUrl + this.props.poster_path} />
          <Modal.Description>
            <Header>Rating Average: {this.props.vote_average}</Header>
            <p>{this.props.overview}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button
              color={(this.props.isQueued) ? 'red' : 'blue'}
              content={(this.props.isQueued) ? 'Remove It' : 'Queue It'}
              onClick={(this.props.isQueued) ? this.removeFromQueue : this.addToQueue}
            />
          </Modal.Actions>
      </Modal>
    );
  }
}