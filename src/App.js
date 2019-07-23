import React, { useState, useEffect } from 'react';
import './App.css';
import { Howl } from 'howler'; 
import SoundFile from './assets/sound.mp3';
// import FileReaderInput from 'react-file-reader-input';
// import ReactFileReader from 'react-file-reader';

// export default class App extends React.Component {
//   state= {
//     sound: undefined,
//     song: [ require('./assets/sound.mp3') ]
//   }
  
//   playSound = () => {
//     console.log('play')
//     this.state.sound.play();
//   }

//   stopSound = () => {
//     console.log('stop')
//     this.state.sound.stop();
//   }

//   componentDidMount(){
//     const sound = new Howl({
//       src: this.state.song
//     });
    
//     this.setState({sound: sound});
//   }
  
//   render() {
//     return(
//       <div className="App">
//         <button onClick={ this.playSound }>Play</button>
//         <button onClick={ this.stopSound }>Stop</button>
//       </div>
//     )
//   }
// }

// react async file reader

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  })
}

async function processFile(e) {
  try {
    let file = e.target.files[0]; // document.getElementById('fileInput').files[0];
    let contentBuffer = await readFileAsync(file);
    console.log(contentBuffer);
  } catch(err) {
    console.log(err);
  }
}

function Playlist(props) {
  const [ files, setFiles ] = useState({});
  useEffect(() => {
    //console.log(files);
    const loaded = Object.values(files);
    loaded.forEach((file) => {
      readFileAsync(file)
        .then(data => {
          file.arrayBuffer = data;
          console.log(file)
        })
    })
  },[files]);
  
  return(
    <div>
      <h1>Playlist</h1>
      <input 
        type="file"
        onChange= { (event) => setFiles(event.target.files) }
        accept=".mp3,.m4a,.wav,.wma,.aiff"
        multiple  
      />
      <ul>
        {
          Object.values(files)
            .map((file, index) => 
              <li key={ index }>{ file.name }</li>
            )
        }
      </ul>
    </div>
  )
}

function Player(props) {
  const [ sound, setSound ] = useState(undefined);
  useEffect(() => {
    const soundObj = new Howl({
      src: props.song
    });
    setSound(soundObj)
  },[])
  
  const [ play, setPlay ] = useState(false)
  useEffect(() => {
    if (sound === undefined) return
    play ? sound.play() : sound.stop()
  }, [play])

  return(
    <div className="player">
      <button onClick={ () => setPlay(true) }>Play</button>
      <button onClick={ () => setPlay(false) }>Stop</button>
    </div>
  )
}

export default function App() {

  return (
    <div className="App">
      <Player song={ SoundFile } />
      <Playlist />
    </div>
  );
}

