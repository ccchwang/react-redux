import {SET_LYRICS} from '../constants.js'
import axios from 'axios';
import store from '../store.js'

export const setLyrics = function (text){
  return {
    type: SET_LYRICS,
    lyric: text
  }
}


export const fetchLyrics = function(artist, song) {

  return function(dispatch, getState) {
    axios.get(`api/lyrics/${artist}/${song}`)
    .then((res) => {
      return dispatch(setLyrics(res.data.lyric))
    })

  }
}












//takes action type/constant and returns redux action obj. Action obj can be passed into store.dispatch to affect state of store

//store.dispatch takes in action object. Calls reducer and passes in action object and current state of store.
//**we never call reducers ourselves, they are called for us with store.dispatch.
//store.dispatch(setLyrics(text))

//1) use synchronous action creator fn to create action object
//2) pass in action obj to dispatch
//3) dispatch calls reducer with prev state and action obj. returns new state




//takes action type/function and returns redux function that does async work. Action fn can be passed into store.dispatch

//store.dispatch (1) takes in action fn that is called with some data. Action fn first executes and does async work. Then with results of that work, creates action object (using setLyrics). That action obj is passed to dispatch (2) to change store state.
//1) use async action creator fn to create action fn
//2) pass in action fn to store.dispatch (1) with its own args
//  2a) action fn does async work
//  2b) async work returns obj. pass obj into sync action creator fn to create action obj
//3) action fn passes in action obj to dispatch (2)
//4) dispatch calls reducer w prev state and action obj. returns new state


//every possible action doesn't get passed into single reducer. will be passed into sub reducers. each reducer has its own sub state. Substates are available on store under keys state.lyrics, state.subState
