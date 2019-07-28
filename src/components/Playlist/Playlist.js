import React, { useEffect } from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export const Playlist = () => {
  const {addTracks, tracksList} = useMusicPlayer();

  useEffect(
    () => {
       console.log('Playlist loaded...');
    }, []
  );
  
  const handleSelected = (e) => {
    //console.log(e.target.files)
    const selected = Object.values(e.target.files);
    addTracks(selected);
  }

  return (
    <div className="playlist-container">
      <div className="toolbar-container">
        <input 
          type="file"
          onChange= { handleSelected }
          accept=".mp3,.m4a,.wav,.wma,.aiff"
          multiple  
        />
        <span>{ `${tracksList.length} tracks` }</span>
      </div>
      <div className="tracks-container">
        <ul>
          {
            tracksList.map((track, index)=>(
              <li 
                key={ index }
                style={ track.dataUrl ? {opacity: '1'} : {opacity: '.5'} }
              >
                { track.name }
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}