import React, { useEffect, useContext } from 'react';
import { MusicPlayerProvider, MusicPlayerConsumer } from './MusicPlayerContext';
import { Playlist } from './components/Playlist';
import { Player } from './components/Player';

import './App.css';  

const App = () => {

  return (
    <MusicPlayerProvider>
      <MusicPlayerConsumer>
        {
          ([state]) => 
            <main className="app-container dark-theme">
              <div>{ state.uiTheme }</div>
              <Player />
              <Playlist />
            </main>
        }
      </MusicPlayerConsumer>
    </MusicPlayerProvider>  
  );
}

export default App;