import { useCallback, useState } from "react";

function useLocalStorage() {
  const [value, setValue] = useState(null);

  const setItem = useCallback((itemKey, itemValue) => {
    localStorage.setItem(itemKey, itemValue);
    setValue(itemValue);
  }, []);

  const getItem = useCallback((itemKey) => {
    const itemValue = localStorage.getItem(itemKey);
    setValue(itemValue);
    return itemValue;
  }, []);

  const removeItem = useCallback((itemKey) => {
    localStorage.removeItem(itemKey);
    setValue(null);
  }, []);
  return { value, setItem, getItem, removeItem };
}

export default useLocalStorage;
