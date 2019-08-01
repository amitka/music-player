import { useState, useEffect, useContext } from 'react';
import { MusicPlayerContext } from '../MusicPlayerContext';

// FileReader.readAsArrayBuffer()
// FileReader.readAsBinaryString()
// FileReader.readAsDataURL()
// FileReader.readAsText()

export const useReadFileAsync = () => {
  const [state, setState] = useContext(MusicPlayerContext);
  const [files, readFilesAsync] = useState(null);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (files !== null) {
        setReady(false)
        let promiseArray = []
        files.forEach(file => {
          const promise = readFileAsync(file)
          promiseArray = [...promiseArray, promise]
          promise
            .then(result => {
              file.sound = result;
              updateTracks()
            })
            .catch(error =>
              console.log('useReadFileAsync error...' + error)
            )
        });

        Promise
          .all(promiseArray)
          .then(result => {
            console.log(result.length)
            setReady(true)
          })
      }
    }, [files]
  )
  
  function updateTracks() {
    const all = [ ...state.tracks, ...files] 
    setState({...state, tracks: all})
  }

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result);
      };
  
      reader.onError = (e) => {
        reject(e)
      }

      try {
        reader.readAsDataURL(file);
      }
      catch(e) {
        console.log(e)
      }
    })
  }
  
  return {
    files,
    readFilesAsync,
    error,
    ready,
    loading
  }
}