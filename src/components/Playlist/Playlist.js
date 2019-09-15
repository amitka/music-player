import React, { useRef, useEffect } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { useReadFileAsync } from "../../hooks/useReadFileAsync";
import classNames from "classnames";

export const Playlist = () => {
  const {
    clearAllTracks,
    selectTrack,
    tracksList,
    currentTrackIndex
  } = useMusicPlayer();
  const { addFiles } = useReadFileAsync();
  const fileInput = useRef();

  const onTrackSelected = index => {
    selectTrack(index);
  };

  const handleUserSelect = e => {
    const selected = Object.values(e.target.files);
    addFiles(selected);
    // RESET FILE INPUT - ALLOW TO LOAD THE SAME FILES OVER
    fileInput.current.value = "";
  };

  const renderTrackItems = () => {
    return tracksList.map((track, index) => (
      <li
        key={index}
        className={classNames(
            "track-item", 
            { selected: index === currentTrackIndex },
            { isReady: track.sound && track.duration }
          )}
        onClick={() => onTrackSelected(index)}
      >
        <div className="track-data-container">
          <span className="track-index">{index + 1}</span>
          <span className="track-title">{track.title || track.name}</span>
          <span className="track-artist">{track.artist}</span>
          <span className="track-album">{track.album}</span>
        </div>
      </li>
    ))
  }

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
        <ul className="tracks-list">
          {
            renderTrackItems()
          }
        </ul>
      </div>
    </div>
  );
};
