import React, {Component} from 'react';
import { connect } from 'react-redux'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import { Grid } from 'semantic-ui-react'
import Movie from './Movie';
import EmptyContainer from './EmptyContainer'
import * as movieActions from '../../actions/movies'

const SortableItem = SortableElement(({value, removeMovie }) =><Movie removeMovie={removeMovie} value={value} />);

const SortableList = SortableContainer(({items, handleRemove, removeMovie}) => {
  return (
    <Grid columns={3}>
      {items.map((value, index) => (
        <SortableItem
          handleRemove={handleRemove}
          key={`item-${index}`}
          index={index}
          value={value}
          removeMovie={removeMovie} 
        />
      ))}
    </Grid>
  );
});

class SortableComponent extends Component {
  onSortEnd = ({oldIndex, newIndex}) => {
    const reOrderedMovies = arrayMove(this.props.movies, oldIndex, newIndex);
    this.props.dispatch(movieActions.reOrder(reOrderedMovies));
  };

  removeMovie = (unqueuedId) => {
    this.props.dispatch(movieActions.removeFromQueue(unqueuedId));
  };

  render() {
    return (this.props.movies.length) ? 
      <SortableList
        removeMovie={this.removeMovie}
        handleRemove={this.handleRemove}
        axis={'xy'} items={this.props.movies}
        onSortEnd={this.onSortEnd}
        /> :
      <EmptyContainer />;
  }
}

const mapStateToProps = (state) => {
  return {
    movies: state.movies.list || []
  }
};
const ConnectedSortableComponent = connect(mapStateToProps)(SortableComponent);
export default ConnectedSortableComponent