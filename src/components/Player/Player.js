import React from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import * as Icons from "../../Icons/Icons";
import className from "classnames";

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
      <div className="btn-wrapper" onClick={() => playPreviousTrack()}>
        <label className="btn-lbl">Prev</label>
        <div className="btn-box">
          <span>{Icons.FastRewind}</span>
        </div>
      </div>
      <div className="btn-wrapper">
        <label className="btn-lbl">{isPlaying ? "Pause" : "Play"}</label>
        <div
          className={className("btn-box", { "is-playing": isPlaying })}
          onClick={() => playTrack(currentTrackIndex)}
        >
          <span>{Icons.Play}</span>
        </div>
      </div>
      <div className="btn-wrapper" onClick={() => playNextTrack()}>
        <label className="btn-lbl">Next</label>
        <div className="btn-box">
          <span>{Icons.FastForward}</span>
        </div>
      </div>
    </div>
  );
};
