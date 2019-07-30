import { useState, useEffect } from 'react';

export const useReadFileAsync = () => {
  const [file, readFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      console.log(file)
      readFileAsync(file)
      .then(data => {
        file.sound = data;
        setResult(file)
      })
    }, [file]
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
    file,
    readFile,
    error,
    result,
    loading
  }
}