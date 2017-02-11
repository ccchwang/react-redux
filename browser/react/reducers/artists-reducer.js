import {RECEIVE_ARTIST, RECEIVE_ARTISTS} from '../constants';

const initialState = {
  artists: [],
  selectedArtist: {}
}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_ARTISTS:
      newState.artists = action.artists;
      break;

    case RECEIVE_ARTIST:
      newState.selectedArtist = action.selectedArtist;
      break;

    default:
      return state
  }

  return newState
}

