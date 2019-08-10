import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';
import { useReadFileAsync } from './useReadFileAsync';
import { Howl } from 'howler';

export const useMusicPlayer = () => {
  const [state, setState, resetToDefault] = useContext(MusicPlayerContext);
  const {readFilesAsync, ready} = useReadFileAsync();
  
  useEffect(
    () => {
      console.log(state)
    }
  )

  useEffect(
    () => {
      // LOAD FIRST TRACK WHEN ...
      // ... ALL TRACKS DATA IS READY !
      if (ready) {
        console.log('Ready to play...')
        setState(state=>({
          ...state,
          audioPlayer: new Howl({ src: [state.tracks[0].sound]}),
          currentTrackIndex: 0
        }))
      }
    }, [ready]
  )
  
  function clearAllTracks() {
    if (state.isPlaying) {
      state.audioPlayer.unload()
    }
    resetToDefault()
  }

  function addTracks(newTracks) {
    readFilesAsync(newTracks);
  }

  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      // STOP SOUND REMOVE FROM CACHE
      state.audioPlayer.unload();
      // NEW TRACK
      state.audioPlayer = new Howl({ src: [ state.tracks[index].sound ] })
      state.audioPlayer.play();
      state.audioPlayer.on('end', playNextTrack);
      //
      setState(state => ({ 
        ...state,
        currentTrackIndex: index,
        isPlaying: true 
      }));
    }
  }

  // Toggle play or pause
  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState(state => ({...state, isPlaying: !state.isPlaying}));
  }
  
  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex = ((state.currentTrackIndex + -1) % state.tracks.length + state.tracks.length) % state.tracks.length;
    playTrack(newIndex);
  }

  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    playTrack(newIndex);
  }

  return {
    clearAllTracks,
    addTracks,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
    tracksList: state.tracks,
    currentTrackIndex: state.currentTrackIndex,
    isPlaying: state.isPlaying
  }
}
