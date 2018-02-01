import {
  SEARCH_MOVIE_BY_NAME,
  REORDER_MOVIES,
  GET_POPULAR_MOVIES,
  ADD_TO_QUEUE,
  REMOVE_FROM_QUEUE
} from '../actions/actionTypes'; 

const initialState = { list: [], popular: [] }

export default (state = initialState, action = {}) => {
  const { payload, error } = action;
  switch (action.type) {
    case SEARCH_MOVIE_BY_NAME.SUCCESS:
      return {
        ...state,
        current: payload,
        list: [...state.list, payload],
        fetching: false
      }
    case SEARCH_MOVIE_BY_NAME.FAILURE:
      return {
        ...state,
        fetching: false,
        error
      };
    case SEARCH_MOVIE_BY_NAME.REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_POPULAR_MOVIES.SUCCESS:
      const [mainMovie1, mainMovie2, mainMovie3, mainMovie4, ...popular] = payload.results;
      return {
        ...state,
        popular: popular,
        mainMovies: [mainMovie1, mainMovie2, mainMovie3, mainMovie4],
        fetching: false
      }
    case GET_POPULAR_MOVIES.REQUEST:
      return {
        ...state,
        fetching: true
      }
    case GET_POPULAR_MOVIES.FAILURE:
      return {
        ...state,
        fetching: false,
        error
      }
    case REORDER_MOVIES: 
      return {
        ...state,
        list: payload.list
      }
    case ADD_TO_QUEUE:
      return {
        ...state,
        list: [payload.queuedMovie, ...state.list],
      }
    case REMOVE_FROM_QUEUE:
      const unqueuedList = state.list.filter(item => item.tmdbId !== payload.unqueuedMovieId);
      return {
        ...state,
        list: unqueuedList
      }
    default:
      return state;
  }
};