import { useEffect, useState } from "react";

const useDebounce = (value, time) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebouncedValue(value), time);
    return () => {
      clearTimeout(timeOut);
    };
  }, [debouncedValue, setDebouncedValue, time, value]);

  return debouncedValue;
};

export default useDebounce;
