import {
  RECEIVE_ALBUMS,
  RECEIVE_ALBUM
} from '../constants';

const initialState = {
  albums: [],
  selectedAlbum: {},
}

export default function(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch(action.type) {
    case RECEIVE_ALBUMS:
      newState.albums = action.albums
      break;

    case RECEIVE_ALBUM:
      newState.selectedAlbum = action.selectedAlbum
      break;

    default:
       return state;
  }

  return newState;
}

//CHANGE ALL INITIALSTATE PROPS FOR STATES MAINTAINED BY PLAYER REDUCER
//make action constants
//make reducer (importing action constants to switch between. Updates state)
//make action creators (importing action constants to create action objs/fns. Creates ways TO update state)
//change React container to set state to store.state. Make container subscribe to store upon mounting (Import store, action creators to create actions and dispatch)
//make store and pass in any reducers/subreducers (import reducers)
//app methods need to passed by just props. only state properties are passed by props.REDUCER.propName
