import { useContext, useEffect } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';
import { Howl } from 'howler';

export const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  useEffect(
    () => {
      console.log(state)
    }
  )

  useEffect(
    () => {
      console.log('currentTrackIndex = ' + state.currentTrackIndex)
      if (state.isPlaying) {
        console.log('stop sound')
        state.audio.stop()
        setState(state => ({...state, isPlaying: false}));
      }

      if (state.currentTrackIndex !== -1) {
        console.log('init sound')
        const currentAudio = state.tracks[state.currentTrackIndex].sound;
        setState(state => ({...state, audio: currentAudio}));
      }
      
    }, [state.currentTrackIndex]
  )

  useEffect(
    () => {
      let promiseArr = [];

      state.tracks.forEach((track) => {
        if (!track.sound) {
          const promise = readFileAsync(track)
          promiseArr.push(promise);
          promise
            .then(data => {
              track.sound = new Howl({ src: data, html5: true });
              refreshTracks();
            })
        }
      });

      Promise
        .all(promiseArr)
        .then(values => {
          console.log('All resolved...' + state.tracks.length)
          if (state.tracks.length > 0) {
            setState(state => ({...state, currentTrackIndex: 0}));
          }        
        })

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
