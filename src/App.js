import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import { MusicPlayerProvider, MusicPlayerContext } from './MusicPlayerContext';
import useMusicPlayer from './hooks/useMusicPlayer';
// import { Howl } from 'howler';   

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