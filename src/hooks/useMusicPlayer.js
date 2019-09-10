import { useContext, useEffect } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerContext";
import { useReadFileAsync } from "./useReadFileAsync";
import { Howl } from "howler";

export const useMusicPlayer = () => {
  const [state, setState, resetToDefault] = useContext(MusicPlayerContext);
  const { ready } = useReadFileAsync();

  useEffect(() => {
    // LOAD FIRST TRACK WHEN ...
    // ... ALL TRACKS ARE READY !
    if (ready) {
      setState(state => ({
        ...state,
        audioPlayer: new Howl({ src: [state.tracks[0].sound] }),
        currentTrackIndex: 0
      }));
      console.log("Ready to play !");
    }
  }, [ready]);

  useEffect(() => {
    if (state.isPlaying) {
      state.audioPlayer.on("end", playNextTrack);
    }
    return () => {
      state.audioPlayer.off();
    };
  });

  function clearAllTracks() {
    if (state.isPlaying) {
      // STOP ALL SOUNDS - REMOVE FROM CACHE
      state.audioPlayer.unload();
    }
    resetToDefault();
  }

  function selectTrack(index) {
    // STOP PLAYING
    state.audioPlayer.stop();
    // NEW TRACK
    state.audioPlayer = new Howl({ src: [state.tracks[index].sound] });
    //
    state.isPlaying
      ? playTrack(index)
      : setState(state => ({ ...state, currentTrackIndex: index }));
  }

  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      state.audioPlayer.play();
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
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex =
      (((state.currentTrackIndex + -1) % state.tracks.length) +
        state.tracks.length) %
      state.tracks.length;
    selectTrack(newIndex);
  }

  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    selectTrack(newIndex);
  }

  return {
    clearAllTracks,
    playTrack,
    selectTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
    tracksList: state.tracks,
    currentTrackIndex: state.currentTrackIndex,
    isPlaying: state.isPlaying
  };
};
