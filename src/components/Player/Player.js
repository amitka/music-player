import React from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export const Player = () => {
  const {
    playTrack,
    playPreviousTrack,
    playNextTrack,
    currentTrackIndex,
    isPlaying
  } = useMusicPlayer();

  

  return (
    <div className="player-container">
      <button onClick={() => playPreviousTrack() }>Prev</button>
      <button onClick={() => playTrack(currentTrackIndex) }>
        { isPlaying ? "Pause" : "Play"}
      </button>
      <button onClick={() => playNextTrack() }>Next</button>
    </div>
  )
}