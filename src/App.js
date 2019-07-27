import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { MusicPlayerProvider, MusicPlayerContext } from './MusicPlayerContext';
import { statement } from '@babel/template';
// import { Howl } from 'howler';   


const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  useEffect(
    () => {
      console.log('Converting to DataURL...');
    }, [state.tracks]
  )

  function loadTracks(newTracks) {
    const allTracks = [...state.tracks, ...newTracks];
    setState(state=> ({...state, tracks: allTracks}));
  }

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
    loadTracks,
    playTrack,
    togglePlay,
    tracksList: state.tracks
  }
}


const Playlist = () => {
  //const [state, setState] = useContext(MusicPlayerContext);
  const {loadTracks, tracksList} = useMusicPlayer();

  const handleSelected = (e) => {
    //console.log(e.target.files)
    const selected = Object.values(e.target.files);
    loadTracks(selected);
  }

  return (
    <div className="playlist-container">
      <div className="toolbar-container">
        <input 
          type="file"
          onChange= { handleSelected }
          accept=".mp3,.m4a,.wav,.wma,.aiff"
          multiple  
        />
        <span>{ `${tracksList.length} tracks` }</span>
      </div>
      <div className="tracks-container">
        <ul>
          {
            tracksList.map((track, index)=>(
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