import { useState, useEffect} from 'react';

const useReadFileAsync = (file) => {
  return {
    result,
    Error,
    loading
  }
}

export default useReadFileAsync;