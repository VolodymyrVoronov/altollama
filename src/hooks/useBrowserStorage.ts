import { useState } from "react";

import type { StorageType } from "@/types";

export const useBrowserStorage = (key: string) => {
  const [state, setState] = useState<{
    value: string | null;
    type: StorageType;
  }>(() => {
    const localVal = localStorage.getItem(key);
    const sessionVal = sessionStorage.getItem(key);

    if (localVal !== null) return { value: localVal, type: "local" };
    if (sessionVal !== null) return { value: sessionVal, type: "session" };

    return { value: null, type: "session" }; // Default fallback
  });

  const saveToLocalStorage = (newValue: string) => {
    sessionStorage.removeItem(key);
    localStorage.setItem(key, newValue);

    setState({ value: newValue, type: "local" });
  };

  const saveToSessionStorage = (newValue: string) => {
    localStorage.removeItem(key);
    sessionStorage.setItem(key, newValue);

    setState({ value: newValue, type: "session" });
  };

  const clearStorage = () => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);

    setState({ value: null, type: "session" });
  };

  return {
    value: state.value,
    storageType: state.type,

    saveToLocalStorage,
    saveToSessionStorage,
    clearStorage,
  };
};
