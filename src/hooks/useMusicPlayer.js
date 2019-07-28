import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';

export const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  useEffect(
    () => {
      state.tracks.forEach((track) => {
        if (!track.dataUrl){
          readFileAsync(track)
          .then(data => {
            track.dataUrl = data;
            refreshTracks();
          })
        }
      });
    }, [state.tracks]
  )
  
  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onError = (e) => {
        reject(e)
      }

      try {
        reader.readAsDataURL(file);
      }
      catch(e) {
        console.log(e)
      }
    })
  }

  function refreshTracks() {
    setState(state => ({...state, tracks: state.tracks}));
  }

  function addTracks(newTracks) {
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
    addTracks,
    playTrack,
    togglePlay,
    tracksList: state.tracks
  }
}
