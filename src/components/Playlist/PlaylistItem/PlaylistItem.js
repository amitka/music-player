import React from "react";

export const PlaylistItem = ({ track }) => {
  return (
    <div className="playlist-item-container">
      <div className="playlist-item-data">
        <span className="item-index">{track.index}</span>
        <span className="item-title">{track.title}</span>
        <span className="item-artist">{track.artist}</span>
        <span className="item-index">{track.album}</span>
      </div>
    </div>
  );
};
