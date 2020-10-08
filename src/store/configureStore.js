import { createStore, applyMiddleware } from 'redux'
import Reducer from '../reducers/reducers';
import logger from 'redux-logger'
import thunk from 'redux-thunk'


const store = createStore(Reducer, applyMiddleware(thunk, logger));
export default store;