import React from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export const Player = () => {
  const {playTrack, togglePlay, tracksList} = useMusicPlayer();

  return (
    <div className="player-container">
      <button>Prev</button>
      <button onClick={ playTrack }>Play</button>
      <button>Next</button>
    </div>
  )
}