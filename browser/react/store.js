import { createStore, applyMiddleware, combineReducers } from 'redux';

import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import lyricsReducer from './reducers/lyrics-reducer.js';
import playerReducer from './reducers/player-reducer.js';

const myMiddleware = createLogger();
const middleware = applyMiddleware(myMiddleware, thunkMiddleware);


const store = createStore(combineReducers({
  lyrics: lyricsReducer,
  player: playerReducer
}), middleware); //object


export default store
