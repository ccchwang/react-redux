import {RECEIVE_SONGS} from '../constants';
import axios from 'axios';


export const setSongs = function(songs) {
  return {
    type: RECEIVE_SONGS,
    songs
  }
}


export const loadSongs = function() {
  return function(dispatch) {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        dispatch(setSongs(songs))
      });
  }
}
