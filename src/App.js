import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler'; 
//import SoundFile from './assets/sound.mp3';

function App() {
  const sound = new Howl({
    src: [ require('./assets/sound.mp3') ]
  });

  const [ play, setPlay ] = useState(false);
  
  useEffect(()=>{
    let id = undefined
    console.log('useEffect...');
    if (play) {
      console.log('play')
      id = sound.play();
      console.log(id);
    }
    else {
      console.log('stop')
      sound.stop([id]);
    }
  }, [play]);


  return (
    <div className="App">
      <button onClick={ () => setPlay(true) }>Play</button>
      <button onClick={ () => setPlay(false) }>Stop</button>
    </div>
  );
}

export default App;
