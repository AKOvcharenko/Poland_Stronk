import {combineReducers, createStore} from 'redux';
import feedState from './../reducers/reducerFeedState.js';

const reducers = combineReducers({
    feedState: feedState
});

const store = createStore(reducers);

export default store;
