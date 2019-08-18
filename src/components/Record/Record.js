import React, { useState, useEffect } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { base64ArrayBuffer } from "../../helpers/base64ArrayBuffer";
import className from "classnames";

export const Record = () => {
  const { tracksList, currentTrackIndex, isPlaying } = useMusicPlayer();
  const [albumImage, setAlbumImage] = useState("");

  useEffect(() => {
    // TODO: BETTER CODE
    // NO TRACKS NO IMAGE
    if (tracksList.length === 0) {
      setAlbumImage("");
    }
    // LOADING ALBUM IMAGE
    if (tracksList[currentTrackIndex] && tracksList[currentTrackIndex].pic) {
      const picSrc = tracksList[currentTrackIndex].pic;
      if (typeof picSrc === "string") {
        setAlbumImage(picSrc);
      } else if (picSrc.data !== undefined) {
        const b64 = base64ArrayBuffer(picSrc.data);
        setAlbumImage(`data:${picSrc.format};base64, ${b64}`);
      } else {
        // LOAD DEFAULT IMAGE
        setAlbumImage("");
      }
    }
  }, [tracksList, currentTrackIndex]);

  return (
    <div className="record-container">
      <svg viewBox="0 0 100px 100px" className="track-duration-bar">
        <circle
          cx="50%"
          cy="50%"
          r="50%"
          stroke="#fff"
          strokeWidth="2px"
          fill="none"
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
