import React from "react";

function useLocalStorage(
  key: string,
  initialState: React.SetStateAction<void>
) {
  const [value, setValue] = React.useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof initialState == "function") return initialState();
    return initialState;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
