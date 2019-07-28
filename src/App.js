import React from 'react';
import { MusicPlayerProvider } from './MusicPlayerContext';
import { Playlist } from './components/Playlist';
import { Player } from './components/Player';
// import { Howl } from 'howler'; 
import './App.css';  

const App = () => {
  return (
    <MusicPlayerProvider>
      <div className="App">
        <Player />
        <Playlist />
      </div>
    </MusicPlayerProvider>
  );
}

export default App;