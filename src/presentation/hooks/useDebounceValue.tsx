import {useEffect, useState} from 'react';

export const useDebounceValue = (input: string = '', ms: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [input]);

  return {
    debounceValue,
  };
};
