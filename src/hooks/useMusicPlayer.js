import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';
import { useReadFileAsync } from './useReadFileAsync';
import { Howl } from 'howler';

export const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);
  const {readFilesAsync, done} = useReadFileAsync()
  
  // useEffect(
  //   () => {
  //     console.log(state)
  //   }, [state]
  // )
  
  function addTracks(newTracks) {
    //const allTracks = [...state.tracks, ...newTracks];
    //setState(state=> ({...state, tracks: allTracks}));
    readFilesAsync(newTracks);
  }

  function playTrackAt(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    }
    else if (index < 0) {
      index = state.tracks.length -1;
    } 
    else if (index > state.tracks.length -1) {
      index = 0;
    }

    setState(state => ({...state, currentTrackIndex: index}));
  }

  // Toggle play or pause
  function togglePlay() {
    if (state.isPlaying) {
      state.audio.pause();
    } else {
      state.audio.play();
    }

    setState(state => ({...state, isPlaying: !state.isPlaying}));
  }
  
  return {
    addTracks,
    playTrackAt,
    togglePlay,
    tracksList: state.tracks,
    currentTrackIndex: state.currentTrackIndex
  }
}
