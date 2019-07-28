import { useState, useEffect} from 'react';

export const useReadFile = (options) => {
  const { method = 'readAsDataURL'} = options;
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      if (!file) return
      const reader = new FileReader(file)
      reader.onloadstart = () => {
        setLoading(true)
      }
      reader.onloadend = () => {
        setLoading(false)
      }
      reader.onload = e => {
        setResult(e.target.result)
      }
      reader.onError = e => {
        setError(e)
      }
      try {
        reader[method](file)
      } catch (e) {
        setError(e)
      }
    }, [file]
  )

  return {
    file,
    setFile,
    result,
    error,
    loading
  }
}
