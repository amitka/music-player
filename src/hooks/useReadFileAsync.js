import { useState, useEffect, useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerContext";
import { Howl, Howler } from "howler";

export const useReadFileAsync = () => {
  const [state, setState] = useContext(MusicPlayerContext);
  const [files, setFiles] = useState(null);
  //const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.tracks.length === 0) {
      setFiles(null);
      setReady(false);
    } else {
      setReady(true);
    }
  }, [state.tracks]);

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
            return file.sound;
          })
          .then(result => {
            const durationPromise = getAudioDuration(result);
            promiseArray = [...promiseArray, durationPromise];
            durationPromise.then(result => {
              file.duration = result;
            });
          })
          .catch(error => console.log("useReadFileAsync error..." + error));

        // MEDIA TAGS READER
        const tagsPromise = readMediaTagsAsync(file);
        promiseArray = [...promiseArray, tagsPromise];
        tagsPromise.then(result => {
          const tags = result.tags;
          file.artist = tags.artist;
          file.album = tags.album;
          file.pic = tags.picture;
          file.title = tags.title;
          file.trackNo = tags.track;
          file.year = tags.year;
        });
      });

      Promise.all(promiseArray).then(() => {
        updateTracks();
      });
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
        let track = new Howl({ src: [file] });
        // console.log(track._state);
        if (track.state() === "loaded") {
          resolve(track.duration());
        }
        track.on("load", () => {
          const dur = track.duration();
          resolve(dur);
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
    //error,
    ready
    //loading
  };
};
