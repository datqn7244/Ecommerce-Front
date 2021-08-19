import { useEffect, useState, Dispatch, SetStateAction } from "react";

function usePersistentState<T> (initialState: T|(() => T), key: string): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const persistentState = window.localStorage.getItem(key);
    return persistentState ? JSON.parse(persistentState) : initialState;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

export default usePersistentState;
