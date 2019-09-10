import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { base64ArrayBuffer } from "../../helpers/base64ArrayBuffer";
import className from "classnames";

export const Record = () => {
  const { tracksList, currentTrackIndex, isPlaying } = useMusicPlayer();
  const [albumImage, setAlbumImage] = useState("");
  const [progressStyle, setProgressStyle] = useState({
    animation: {},
    restart: false
  });
  const [progressLength, setProgressLength] = useState(undefined);
  const progressPath = useRef();

  useEffect(() => {
    // ON INIT LOAD SET PATH PARAMS
    setProgressLength(progressPath.current.getTotalLength());
  });

  useEffect(() => {
    // RESTART PROGRESS
    if (currentTrackIndex > -1) {
      setProgressStyle({ restart: true });
    }
    // RESET PROGRESS
    if (currentTrackIndex === -1) {
      setProgressStyle({ animation: {}, restart: false });
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (progressStyle.restart) {
      const duration = tracksList[currentTrackIndex].duration;
      const animate = { animation: `dash ${duration}s linear forwards` };
      setProgressStyle({
        animation: animate,
        restart: false
      });
      console.log(animate);
    }
  }, [progressStyle]);

  return (
    <div className="record-container">
      <svg className="track-duration-progress-bar">
        <circle
          className={className("progress-path", { "pause-dash": !isPlaying })}
          ref={progressPath}
          cx="50%"
          cy="50%"
          r="50%"
          fill="none"
          stroke="#fff"
          strokeWidth="4px"
          strokeDasharray={progressLength}
          strokeDashoffset={progressLength}
          style={progressStyle.animation}
          onAnimationEnd={() =>
            setProgressStyle({ animation: {}, restart: false })
          }
        />
      </svg>
      <div className={className("record-base", { "pause-spin": !isPlaying })}>
        <div className="record-lbl">
          <img src={albumImage} alt="album-pic" />
        </div>
      </div>
      <div className="record-pin" />
    </div>
  );
};
