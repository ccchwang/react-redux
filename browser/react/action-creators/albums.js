import {RECEIVE_ALBUM, RECEIVE_ALBUMS} from '../constants.js';
import axios from 'axios';
import { convertAlbum, convertAlbums } from '../utils';


//SYNC ACTION CREATORS - OBJECTS
export const receiveAlbums = function(albums) {
  return {
    type: RECEIVE_ALBUMS,
    albums: albums
  }
}

export const receiveAlbum = function(album) {
  return {
    type: RECEIVE_ALBUM,
    selectedAlbum: album
  }
}

//store.dispatch(getAlbums() => return albums data => dispatch(receiveAlbums(albums)))


//ASYNC ACTION CREATORS - FUNCTIONS

export const selectAlbum = function(albumId) {
  return function(dispatch) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album =>
        dispatch(receiveAlbum(convertAlbum(album)))
        )
  }
}

export const loadAlbums = function(albums) {
  return function(dispatch) {
    dispatch(receiveAlbums(convertAlbums(albums)))
  }
}
