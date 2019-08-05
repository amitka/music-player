import React, { useState } from 'react';
import { Howl } from 'howler';
import { ExampleTrack } from './components/ExampleTrack';

const MusicPlayerContext = React.createContext([{}, ()=>{}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    audioPlayer: new Howl({ src: [ExampleTrack.sound]}),
    tracks: [ExampleTrack],
    currentTrackIndex: 0,
    isPlaying: false
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      { props.children }
    </MusicPlayerContext.Provider>
  )
}

export { MusicPlayerContext, MusicPlayerProvider };