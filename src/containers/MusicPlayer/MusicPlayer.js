import React, { useContext } from "react";
import { Playlist } from "../../components/Playlist";
import { Player } from "../../components/Player";
import { Record } from "../../components/Record";
import { MusicPlayerContext } from "../../context/MusicPlayerContext";
import className from "classnames";

export const MusicPlayer = () => {
  const [state] = useContext(MusicPlayerContext);

  return (
    <main
      className={className(
        "music-player app-container unselectable",
        `${state.uiTheme}`
      )}
    >
      <Record />

      <Playlist />
      <Player />
    </main>
  );
};
