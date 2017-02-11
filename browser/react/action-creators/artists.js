import {RECEIVE_ARTIST, RECEIVE_ARTISTS} from '../constants';
import axios from 'axios';
import { convertSong, convertAlbums } from '../utils';

//SYNC - RETURN ACTION OBJ
export const setArtists = function(artists) {
  return {
    type: RECEIVE_ARTISTS,
    artists
  }
}

export const selectedArtist = function(artist) {
  return {
    type: RECEIVE_ARTIST,
    selectedArtist: artist
  }
}


//ASYNC - RETURN ACTION FN

export const onLoadArtist = function (artist, albums, songs) {
  return function (dispatch) {
    songs = songs.map(convertSong);
    albums = convertAlbums(albums);
    artist.albums = albums;
    artist.songs = songs;

    dispatch(selectedArtist(artist))
  }
}

export const selectArtist = function (artistId) {
  return function(dispatch) {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(data => dispatch(onLoadArtist(...data)));
  }
}
