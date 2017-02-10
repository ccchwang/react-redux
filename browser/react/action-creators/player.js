import {SET_CURRENT_SONG, SET_LIST, START_PLAYING, STOP_PLAYING} from '../constants.js'
import axios from 'axios';
import store from '../store.js'
import AUDIO from '../audio';

//SYNCHRONOUS ACTION OBJECT CREATORS
export const setCurrentSong = function (song){
  return {
    type: SET_CURRENT_SONG,
    currentSong: song
  }
}

export const setCurrentSongList = function (list){
  return {
    type: SET_LIST,
    currentSongList: list
  }
}

export const startPlaying = function (){
  return {
    type: START_PLAYING
  }
}

export const stopPlaying = function (){
  return {
    type: STOP_PLAYING
  }
}

//ASYNC ACTION FN CREATORS
export const play = function() {
  return function(dispatch) {
      AUDIO.play();
       dispatch(startPlaying())
    }
}

export const pause = function() {
  return function(dispatch) {
      AUDIO.pause();
       dispatch(stopPlaying())
    }
}

export const load = function (currentSong, currentSongList) {
  return function(dispatch) {
      AUDIO.src = currentSong.audioUrl;
      AUDIO.load();
      dispatch(setCurrentSong(currentSong));
       dispatch(setCurrentSongList(currentSongList))
    }
}

export const startSong = function (song, list) {
  return function(dispatch) {
      dispatch(pause());
      dispatch(load(song, list));
      dispatch(play());
    }
}

export const toggle = function (song, list) {
  return function(dispatch, getState) {
      if (getState().player.isPlaying) pause()(dispatch);

  /* calling pause() doesn't work because that just returns a fn. calling pause()() doesn't work because while that calls the actual pause fn and stops the music, that pause function then tries to call dispatch(stopPlaying()) => dispatch wasn't passed in to that function because it wasn't called by store.dispatch. when an action fn calls another action fn, the 2nd action fn doesn't have dispatch passed it. It's only passed into the originating action fn. You can fix with pause()(dispatch), but that looks weird*/
    else dispatch(play());
    }
}

export const toggleOne = function (selectedSong, selectedSongList) {
  return function(dispatch, getState) {
      if (selectedSong.id !== getState().player.currentSong.id)
        dispatch(startSong(selectedSong, selectedSongList));
      else dispatch(toggle());
    }
}




export const next = () =>
  (dispatch, getState) => {
    dispatch(startSong(...skip(1, getState().player)));
};

export const prev = () =>
  (dispatch, getState) => {
    dispatch(startSong(...skip(-1, getState().player)));
};


//sync action creator to create start_playing, stop_playing action objs


//async action fn creator that returns toggle fn
