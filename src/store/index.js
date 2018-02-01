import { createStore, applyMiddleware } from 'redux'
import fetchMiddleware from '../middleware'
import reducers from '../reducers'

const middlewareList = [
  fetchMiddleware.api,
  fetchMiddleware.omdb,
  fetchMiddleware.tmdb
]

export default (data) => {
  const finalCreateStore = applyMiddleware(...middlewareList)(createStore)
  const store = finalCreateStore(reducers, data)
  return store;
}