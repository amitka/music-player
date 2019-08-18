import { useState, useEffect, useContext } from "react";
import { MusicPlayerContext } from "../context/MusicPlayerContext";

export const useReadFileAsync = () => {
  const [state, setState] = useContext(MusicPlayerContext);
  const [files, readFilesAsync] = useState(null);
  //const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (files !== null) {
      setReady(false);
      let promiseArray = [];
      files.forEach(file => {
        // FILE READER
        const filePromise = readFileAsync(file);
        promiseArray = [...promiseArray, filePromise];
        filePromise
          .then(result => {
            file.sound = result;
            updateTracks();
          })
          .catch(error => console.log("useReadFileAsync error..." + error));
        // MEDIA TAGS READER
        const tagsPromise = readMediaTagsAsync(file);
        tagsPromise.then(result => {
          //console.log(result)
          const tags = result.tags;
          file.artist = tags.artist;
          file.album = tags.album;
          file.pic = tags.picture;
          file.title = tags.title;
          file.trackNo = tags.track;
          file.year = tags.year;
          updateTracks();
        });
      });

      Promise.all(promiseArray).then(result => {
        setReady(true);
      });
    }
  }, [files]);

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

  return {
    files,
    readFilesAsync,
    //error,
    ready
    //loading
  };
};
