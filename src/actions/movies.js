import {
  SEARCH_MOVIE_BY_NAME,
  REORDER_MOVIES,
  GET_POPULAR_MOVIES,
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE
} from './actionTypes';

export const searchByName = (searchTerm) => {
  return {
    types: SEARCH_MOVIE_BY_NAME,
    omdb: { searchTerm }
  }
};

export const reOrder = (list) => {
  return {
    type: REORDER_MOVIES,
    payload: { list }
  }
};

export const getPopular = (pageNumber = 1) => {
  const baseUrl = `discover/movie`;
  const language = `language=en-US`;
  const sort = `sort_by=popularity.desc`;
  const adult = `include_adult=false`;
  const video = `include_video=false`;
  const page = `page=${pageNumber}`;
  const popularUrl = `${baseUrl}?${language}&${language}&${adult}&${video}&${sort}&${page}`;
  return {
    types: GET_POPULAR_MOVIES,
    tmdb: { popularUrl }
  }
}

export const addToQueue = (queuedMovie) => {
  return {
    type: ADD_TO_QUEUE,
    payload: { queuedMovie }
  }
}

export const removeFromQueue = (unqueuedMovieId) => {
  return {
    type: REMOVE_FROM_QUEUE,
    payload: { unqueuedMovieId }
  }
}
