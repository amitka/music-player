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
  const [done, setDone] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (files !== null) {
        files.forEach(file => {
          const promise = readFileAsync(file)
          promise
            .then(result => {
              file.sound = result;
              const all = [ ...state.tracks, ...files] 
              setState({...state, tracks: all})
            })
            .catch(error =>
              console.log('useReadFileAsync error...' + error)
            )
        });
      }
    }, [files]
  )

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
    done,
    loading
  }
}