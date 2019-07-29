import React from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export const Player = () => {
  const {playTrack, playTrackAt, togglePlay, tracksList, currentTrackIndex} = useMusicPlayer();

  return (
    <div className="player-container">
      <button onClick={ () => playTrackAt(currentTrackIndex - 1)}>Prev</button>
      <button onClick={ playTrack }>Play</button>
      <button onClick={ () => playTrackAt(currentTrackIndex + 1)}>Next</button>
    </div>
  )
}