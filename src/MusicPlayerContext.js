import React, { useState } from 'react';
// import {Howl, Howler} from 'howler';
const MusicPlayerContext = React.createContext([{}, ()=>{}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    audio: null,
    tracks: [],
    currentTrackIndex: -1,
    isPlaying: false
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      { props.children }
    </MusicPlayerContext.Provider>
  )
}

export { MusicPlayerContext, MusicPlayerProvider };