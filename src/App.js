import React from 'react';
import { MusicPlayerProvider } from './MusicPlayerContext';
import { Playlist } from './components/Playlist';
import { Player } from './components/Player';

import './App.css';  

const App = () => {
  return (
    <MusicPlayerProvider>
      <main className="app-container dark-theme">
        <Player />
        <Playlist />
      </main>
    </MusicPlayerProvider>
  );
}

export default App;