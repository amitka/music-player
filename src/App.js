import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { MusicPlayerProvider, MusicPlayerContext } from './MusicPlayerContext';
import { statement } from '@babel/template';
// import { Howl } from 'howler';   


const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  // Play a specific track
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      setState(state => ({ ...state, currentTrackIndex: index, isPlaying: true }));
    }
  }

  // Toggle play or pause
  function togglePlay() {
    setState(state => ({...state, isPlaying: !state.isPlaying}));
  }
  
  return {
    playTrack,
    togglePlay,
    tracksList: state.tracks
  }
}


const Playlist = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  const handleFiles = (e) => {
    //console.log(e.target.files)
    const justLoaded = Object.values(e.target.files);
    const allTracks = [...state.tracks, ...justLoaded];
    //
    setState(state=> ({...state, tracks: allTracks}))
  }

  return (
    <div className="playlist-container">
      <div className="toolbar-container">
        <input 
          type="file"
          onChange= { handleFiles }
          accept=".mp3,.m4a,.wav,.wma,.aiff"
          multiple  
        />
        <span>{ `${state.tracks.length} tracks` }</span>
      </div>
      <div className="tracks-container">
        <ul>
          {
            state.tracks.map((track, index)=>(
              <li key={ index }>{ track.name }</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}


const App = () => {
  
  return (
    <MusicPlayerProvider>
      <div className="App">
        <Playlist />
      </div>
    </MusicPlayerProvider>
    
  );
}

export default App;