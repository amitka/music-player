import React, { useRef } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import classNames from "classnames";

export const Playlist = () => {
  const {
    clearAllTracks,
    selectTrack,
    addTracks,
    tracksList,
    currentTrackIndex
  } = useMusicPlayer();

  const fileInput = useRef();

  const onTrackSelected = index => {
    selectTrack(index);
  };

  const handleUserSelect = e => {
    const selected = Object.values(e.target.files);
    addTracks(selected);
    // RESET FILE INPUT - ALLOW TO LOAD THE SAME FILES OVER
    fileInput.current.value = "";
  };

  return (
    <div className="playlist-container">
      <div className="toolbar-container">
        <input
          ref={fileInput}
          type="file"
          onChange={handleUserSelect}
          accept=".mp3,.m4a,.wav,.wma,.aiff"
          multiple
        />
        <button onClick={clearAllTracks}>Clear</button>
        <span>{`${tracksList.length} tracks`}</span>
      </div>
      <div className="tracks-container">
        <ul>
          {tracksList.map((track, index) => (
            <li
              key={index}
              style={track.sound ? { opacity: "1" } : { opacity: ".5" }}
              className={classNames("track-item", {
                selected: index === currentTrackIndex
              })}
              onClick={() => onTrackSelected(index)}
            >
              <span>{index + 1}</span>
              <span>{track.title || track.name}</span>
              <span>{track.artist}</span>
              <span>{track.album}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
