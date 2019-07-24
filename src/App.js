import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler';   

function usePlaylist() {
  return [];
}

function FileInput() {

  const handleFiles = (e) => {
    console.log(e.target.files)
  }

  return(
    <div>
      <input 
        type="file" 
        accept=".mp3,.m4a,.wav,.wma,.aiff"
        onChange= { handleFiles }
        multiple
      />
    </div>
  )
}

function Playlist() {
  const [ songs, setSongs ] = usePlaylist()
  return(
    <div className="playlist-container">
      <FileInput />
    </div>
  )
} 

function Player() {
  return(
    <div className="player-container">
      <button>Play</button>
      <button>Stop</button>
    </div>
  )
}

export default function App() {
  
  return (
    <div className="App">
      <Player />
      <Playlist />
    </div>
  );
}

