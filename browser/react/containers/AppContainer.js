import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';

import store from '../store.js'
import initialState from '../initialState';
import AUDIO from '../audio';

import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import {play, pause, load, startSong, toggleOne, toggle, next, prev} from '../action-creators/player.js';
import {selectAlbum, loadAlbums} from '../action-creators/albums.js';
import {selectArtist, setArtists} from '../action-creators/artists.js';
import {loadSongs} from '../action-creators/songs.js';


export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = Object.assign(initialState, store.getState());

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount () {
    Promise
      .all([
        axios.get('/api/albums/'),
        axios.get('/api/artists/'),
        axios.get('/api/playlists')
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoad(...data));

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));

    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  onLoad (albums, artists, playlists) {
    store.dispatch(loadAlbums(albums));
    store.dispatch(setArtists(artists));
    this.setState({
      playlists: playlists
    });
  }

  play () {
    store.dispatch(play())
  }

  pause () {
    store.dispatch(pause())
  }

  load (currentSong, currentSongList) {
    store.dispatch(load(currentSong, currentSongList))
  }

  startSong (song, list) {
    store.dispatch(startSong(song, list))
  }

  toggleOne (selectedSong, selectedSongList) {
    store.dispatch(toggleOne(selectedSong, selectedSongList))
  }

  toggle () {
    store.dispatch(toggle())
  }

  next () {
    store.dispatch(next())
  }

  prev () {
    store.dispatch(prev())
  }

  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectAlbum (albumId) {
    store.dispatch(selectAlbum(albumId))
  }

  selectArtist (artistId) {
    store.dispatch(selectArtist(artistId))
  }

  addPlaylist (playlistName) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        }, () => {
          hashHistory.push(`/playlists/${playlist.id}`)
        });
      });
  }

  selectPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        this.setState({
          selectedPlaylist: playlist
        });
      });
  }

  loadSongs () {
    store.dispatch(loadSongs())
  }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = this.state.selectedPlaylist;
        const songs = this.state.selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });

        this.setState({
          selectedPlaylist: newSelectedPlaylist
        });
      });
  }

  render () {

    const props = Object.assign({}, this.state, {
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      selectAlbum: this.selectAlbum,
      selectArtist: this.selectArtist,
      addPlaylist: this.addPlaylist,
      selectPlaylist: this.selectPlaylist,
      loadSongs: this.loadSongs,
      addSongToPlaylist: this.addSongToPlaylist
    });

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={this.state.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.player.currentSong}
          currentSongList={this.state.player.currentSongList}
          isPlaying={this.state.player.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
