import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler'; 

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  })
}

function Player() {
  const [ files, setFiles ] = useState({});
  useEffect(() => {
    //console.log(files);
    const loaded = Object.values(files);
    loaded.forEach((file) => {
      readFileAsync(file)
        .then(data => {
          file.dataUrl = data;
          console.log(file)
          const sound = new Howl({
            src: files[0].dataUrl
          })
          console.log(sound)
          sound.play()
        })
    })
    
  },[files]);

  return(
    <div className="player">
      <button>Play</button>
      <button>Stop</button>
      <input 
        type="file"
        onChange= { (event) => setFiles(event.target.files) }
        accept=".mp3,.m4a,.wav,.wma,.aiff"
        multiple  
      />
    </div>
  )
}

export default function App() {

  return (
    <div className="App">
      <Player />
    </div>
  );
}

