import React from "react";
import { MusicPlayerProvider } from "../../context/MusicPlayerContext";
import { MusicPlayer } from "../MusicPlayer";

//import './App.css';

const App = () => {
  return (
    <MusicPlayerProvider>
      <MusicPlayer />
    </MusicPlayerProvider>
  );
};

export default App;
