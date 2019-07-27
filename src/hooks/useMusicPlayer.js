import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  useEffect(
    () => {
      console.log('Converting to DataURL...');
      
    }, [state.tracks]
  )

  function loadTracks(newTracks) {
    const allTracks = [...state.tracks, ...newTracks];
    setState(state=> ({...state, tracks: allTracks}));
  }

  // Play a specific track
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      setState(state => ({ ...state, currentTrackIndex: index, isPlaying: true }));
    }
  }

  // Toggle play or pause
  function togglePlay() {
    setState(state => ({...state, isPlaying: !state.isPlaying}));
  }
  
  return {
    loadTracks,
    playTrack,
    togglePlay,
    tracksList: state.tracks
  }
}

export default useMusicPlayer;