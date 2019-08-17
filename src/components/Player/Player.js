import React, { useState, useEffect } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import * as Icons from "../../Icons/Icons";
import className from "classnames";

export const Player = () => {
  const [nextClick, setNextClick] = useState(false);
  const [prevClick, setPrevClick] = useState(false);
  const [nextTrack, setNextTrack] = useState(false);
  const {
    playTrack,
    playPreviousTrack,
    playNextTrack,
    currentTrackIndex,
    isPlaying,
    tracksList
  } = useMusicPlayer();

  useEffect(() => {
    tracksList[currentTrackIndex + 1] !== undefined
      ? setNextTrack(true)
      : setNextTrack(false);
    //console.log(nextTrack);
  });

  return (
    <div className="player-container">
      <div className="btn-wrapper">
        <label className="btn-lbl">Prev</label>
        <div
          className={className("btn-box", { "is-clicked": prevClick })}
          onClick={() => playNextTrack()}
          onMouseDown={() => setPrevClick(true)}
          onMouseUp={() => setPrevClick(false)}
        >
          <span>{Icons.FastRewind}</span>
        </div>
      </div>
      <div className="btn-wrapper">
        <label className="btn-lbl">{isPlaying ? "Pause" : "Play"}</label>
        <div
          className={className("btn-box wide", { "is-playing": isPlaying })}
          onClick={() => playTrack(currentTrackIndex)}
        >
          <span>{Icons.Play}</span>
        </div>
      </div>
      <div className="btn-wrapper">
        <label className="btn-lbl">Next</label>
        <div
          className={className("btn-box", { "is-clicked": nextClick })}
          onClick={() => playNextTrack()}
          onMouseDown={() => setNextClick(true)}
          onMouseUp={() => setNextClick(false)}
        >
          <span>{Icons.FastForward}</span>
        </div>
      </div>
    </div>
  );
};
