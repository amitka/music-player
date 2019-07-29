import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';
import {Howl, Howler} from 'howler';

export const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  useEffect(
    () => {
      console.log(state)
    }
  )

  useEffect(
    () => {
      if (state.tracks.length > 0) {
        playTrack()
      }
    }, [state.currentTrackIndex]
  )

  useEffect(
    () => {
      state.tracks.forEach((track) => {
        if (!track.dataUrl){
          readFileAsync(track)
          .then(data => {
            track.sound = new Howl({ src: data });
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

  function playTrack() {
    if (state.audio !== null) {
      state.audio.stop();
    }

    const currentAudio = state.tracks[state.currentTrackIndex].sound;
    currentAudio.play();

    setState(state => ({...state, audio: currentAudio}));
  }

  function playTrackAt(index) {
    if (index < 0) {
      index = state.tracks.length -1;
    } 
    else if ( index > state.tracks.length -1) {
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
    playTrack,
    playTrackAt,
    togglePlay,
    tracksList: state.tracks,
    currentTrackIndex: state.currentTrackIndex
  }
}