import React, { useState, useEffect, useRef } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { base64ArrayBuffer } from "../../helpers/base64ArrayBuffer";
import className from "classnames";

export const Record = () => {
  const { tracksList, currentTrackIndex, isPlaying } = useMusicPlayer();
  const [albumImage, setAlbumImage] = useState("");
  const [progressStyle, setProgressStyle] = useState({});
  const durationPath = useRef();

  useEffect(() => {});

  useEffect(() => {
    // ON INIT LOAD SET PATH PARAMS
    resetProgressPath();
  }, []);

  // useEffect(() => {
  //   // TODO: BETTER CODE
  //   // NO TRACKS NO IMAGE
  //   if (tracksList.length === 0) {
  //     setAlbumImage("");
  //   }
  //   // LOADING ALBUM IMAGE
  //   if (tracksList[currentTrackIndex] && tracksList[currentTrackIndex].pic) {
  //     const picSrc = tracksList[currentTrackIndex].pic;
  //     if (typeof picSrc === "string") {
  //       setAlbumImage(picSrc);
  //     } else if (picSrc.data !== undefined) {
  //       const b64 = base64ArrayBuffer(picSrc.data);
  //       setAlbumImage(`data:${picSrc.format};base64, ${b64}`);
  //     } else {
  //       // LOAD DEFAULT IMAGE
  //       setAlbumImage("");
  //     }
  //   } else {
  //     setAlbumImage("");
  //   }
  // }, [tracksList, currentTrackIndex]);

  useEffect(() => {
    console.log("currentTrackIndex = " + currentTrackIndex);
    if (tracksList[currentTrackIndex]) {
      if (durationPath.current.style.animationName) {
        console.log(durationPath.current.style.animationName);
      }
      animateProgressPath();
    }
  }, [currentTrackIndex]);

  const animateProgressPath = () => {
    console.log("new animation...");
    const animation = {
      animationName: "dash",
      animationDuration: `${tracksList[currentTrackIndex].duration}s`,
      animationTimingFunction: "linear",
      animationFillMode: "forwards"
    };
    setProgressStyle(progressStyle => ({ ...progressStyle, ...animation }));
  };

  const resetProgressPath = () => {
    const pathLength = durationPath.current.getTotalLength();
    setProgressStyle({
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });
  };

  return (
    <div className="record-container">
      <svg className="track-duration-progress-bar">
        <circle
          className={className("progress-path", { "pause-dash": !isPlaying })}
          onAnimationEnd={() => {
            console.log("animation end...");
            resetProgressPath();
          }}
          ref={durationPath}
          cx="50%"
          cy="50%"
          r="50%"
          stroke="#fff"
          strokeWidth="4px"
          fill="none"
          style={progressStyle}
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
