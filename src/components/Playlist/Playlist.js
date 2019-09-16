import React, { useRef, useEffect } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { useReadFileAsync } from "../../hooks/useReadFileAsync";
import { sec2min } from "../../helpers/sec2min";
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
    // RESET FILE INPUT,
    // ALLOW TO LOAD THE SAME FILES OVER !
    fileInput.current.value = "";
  };

  const renderTrackItems = () => {
    return tracksList.map((track, index) => (
      <li
        key={index}
        className={classNames(
          "track-item",
          { selected: index === currentTrackIndex },
          { isReady: track.sound && track.duration && track.tags }
        )}
        onClick={() => onTrackSelected(index)}
      >
        <span className="track-index">{index + 1}</span>
        <span className="track-title">
          {track.tags !== undefined ? track.tags.title : "Untitled"}
        </span>
        <span className="track-artist">
          {track.tags !== undefined ? track.tags.artist : "Unknown"}
        </span>
        <span className="track-album">
          {track.tags !== undefined ? track.tags.album : "Unknown"}
        </span>
        <span className="track-duration">
          {track.duration !== undefined ? sec2min(track.duration) : "00:00"}
        </span>
      </li>
    ));
  };

  return (
    <div className="playlist-container">
      <div className="toolbar-container">
        <div className="toolbar-btn">
          <input
            ref={fileInput}
            type="file"
            onChange={handleUserSelect}
            accept=".mp3,.m4a,.wav,.wma,.aiff"
            multiple
          />
          <button onClick={clearAllTracks}>Clear</button>
        </div>
        <span className="tracks-counter">{`${tracksList.length} tracks`}</span>
      </div>
      <div className="tracks-container">
        <ul className="tracks-list">
          <li className="track-item header">
            <span className="track-index">#</span>
            <span className="track-title">Title</span>
            <span className="track-artist">Artist</span>
            <span className="track-album">Album</span>
            <span className="track-duration">Duration</span>
          </li>
          {tracksList.length > 0 && renderTrackItems()}
        </ul>
      </div>
    </div>
  );
};
