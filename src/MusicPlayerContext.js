import React, { useState } from 'react';

const MusicPlayerContext = React.createContext([{}, ()=>{}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    tracks: [{name: "Track #1"}, {name: "Track #2"}, {name: "Track #3"}]
  });

  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      { props.children }
    </MusicPlayerContext.Provider>
  )
}

export { MusicPlayerContext, MusicPlayerProvider };