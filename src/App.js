import React from 'react';
import { MusicPlayerProvider } from './MusicPlayerContext';
import { Playlist } from './components/Playlist';
// import { Howl } from 'howler'; 
import './App.css';  

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