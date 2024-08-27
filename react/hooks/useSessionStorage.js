import { useState } from "react";

export const useSessionStorage = (key, initialValue = "") => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  const updateValue = (newValue) => {
    setValue(newValue);
    sessionStorage.setItem(key, JSON.stringify(newValue));
  };

  const removeValue = () => {
    setValue(null);
    sessionStorage.removeItem(key);
  };

  return [value, updateValue, removeValue];
};
