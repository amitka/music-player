import { useState, useEffect, useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerContext";
import { Howl, Howler } from "howler";

export const useReadFileAsync = () => {
  const [state, setState] = useContext(MusicPlayerContext);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (files !== null) {
      let promiseArray = [];

      files.forEach(file => {
        // FILE READER
        const filePromise = readFileAsync(file);
        promiseArray = [...promiseArray, filePromise];
        filePromise
          .then(result => {
            file.sound = result;
            //console.log('file resolved');
          })

        // MEDIA TAGS READER
        const tagsPromise = readMediaTagsAsync(file);
        promiseArray = [...promiseArray, tagsPromise];
        tagsPromise
          .then(result => {
            //console.log('tags resolved');
            const tags = result.tags;
            file.artist = tags.artist;
            file.album = tags.album;
            file.pic = tags.picture;
            file.title = tags.title;
            file.trackNo = tags.track;
            file.year = tags.year;
          });
      });

      Promise.all(promiseArray)
        .then(() => {
          console.log('ALL resolved');
          const durationPromise = files.map(file => getAudioDuration(file));
          return Promise.all(durationPromise);
        })
        .then(() => {
          console.log('done')
          console.log(files);
          updateTracks();
          //setFiles(null);
        })
        .catch(error => console.log(`Error in promises ${error}`));
    }
  }, [files]);

  function addFiles(newFiles) {
    setFiles(newFiles);
  }

  function updateTracks() {
    const all = [...state.tracks, ...files];
    setState(state => ({ ...state, tracks: all }));
  }

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onError = e => {
        reject(e);
      };

      try {
        reader.readAsDataURL(file);
      } catch (e) {
        console.log(e);
      }
    });
  }

  function readMediaTagsAsync(file) {
    return new Promise((resolve, reject) => {
      try {
        window.jsmediatags.read(file, {
          onSuccess: function(tag) {
            resolve(tag);
          },
          onError: function(error) {
            reject(error);
          }
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  function getAudioDuration(file) {
    return new Promise((resolve, reject) => {
      try {
        let track = new Howl({ src: [file.sound] });
        
        if (track.state() === "loaded") {
          file.duration = track.duration()
          resolve(file);
        }

        track.on("load", () => {
          file.duration = track.duration()
          resolve(file);
        });

        track.on("loaderror", () => {
          reject("getAudioDuration error");
        });
      } catch (e) {
        console.log(e);
      }
    });
  }

  return {
    addFiles,
    files,
  };
};
