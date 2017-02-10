
import React, { Component } from 'react';
import store from '../store.js'
import Lyrics from '../components/Lyrics.js';
import {setLyrics, fetchLyrics} from '../action-creators/lyrics.js';
import axios from 'axios';


export default class LyricsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      artistQuery: '',
      songQuery: ''
    }, store.getState());
    this.setArtist = this.setArtist.bind(this);
    this.setSong = this.setSong.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  setArtist(artist){
    this.setState({artistQuery: artist})
  }

  setSong(song){
    this.setState({songQuery: song})
  }

  handleSubmit() {
    if (this.state.artistQuery && this.state.songQuery) {
      store.dispatch(fetchLyrics(this.state.artistQuery, this.state.songQuery))
    }

  }

  render() {
    const props = Object.assign({}, this.state, {
      setArtist: this.setArtist,
      setSong: this.setSong,
      handleSubmit: this.handleSubmit
    })

    return (
      <div>
        {
          React.cloneElement(<Lyrics />, props)
        }
        </div>
    )





  }

}
