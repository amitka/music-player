import React from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export const Player = () => {
  const {playTrackAt, currentTrackIndex} = useMusicPlayer();

  // handleButtonClicked = (e) => {

  // }

  return (
    <div className="player-container">
      <button onClick={() => playTrackAt(currentTrackIndex - 1)}>Prev</button>
      <button onClick={() => playTrackAt(currentTrackIndex) }>Play</button>
      <button onClick={() => playTrackAt(currentTrackIndex + 1)}>Next</button>
    </div>
  )
}