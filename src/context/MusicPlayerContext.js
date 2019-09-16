import React, { useState, useEffect } from "react";
import { Howl } from "howler";
import { ExampleTrack } from "../components/ExampleTrack";

const MusicPlayerContext = React.createContext([{}, () => {}, () => {}]);

const DEFAULT_STATE = {
  audioPlayer: new Howl({ src: [null] }),
  tracks: [],
  currentTrackIndex: -1,
  isLoading: false,
  isPlaying: false,
  uiTheme: "dark-theme"
};

const MusicPlayerProvider = props => {
  const [state, setState] = useState(DEFAULT_STATE);

  // useEffect(() => {
  //   setState(state => ({
  //     ...state,
  //     audioPlayer: new Howl({ src: [ExampleTrack.sound] }),
  //     tracks: [ExampleTrack],
  //     currentTrackIndex: 0
  //   }));
  // }, []);

  useEffect(() => {
    if (state.isLoading === false && state.tracks.length > 0) {
      setState(state => ({
        ...state,
        audioPlayer: new Howl({ src: [state.tracks[0].sound] }),
        currentTrackIndex: 0
      }));
      console.log("context says: Ready to play !");
    }
  }, [state.isLoading]);

  function resetToDefault() {
    console.log("context says: reset ...");
    setState(DEFAULT_STATE);
  }

  return (
    <MusicPlayerContext.Provider value={[state, setState, resetToDefault]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
};

const MusicPlayerConsumer = MusicPlayerContext.Consumer;

export { MusicPlayerContext, MusicPlayerProvider, MusicPlayerConsumer };
