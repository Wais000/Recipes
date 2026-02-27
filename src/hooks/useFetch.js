// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState({ results: null, loading: true, error: null });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setData({ results: null, loading: true, error: null });

    fetch(url, { signal })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(results => setData({ results, loading: false, error: null }))
      .catch(error => {
        if (error.name !== 'AbortError') {
          setData({ results: null, loading: false, error: error.message });
        }
      });

    return () => abortController.abort();
  }, [url]);

  return data;
};

export default useFetch;