import { useState, useEffect } from 'react';

// Custom hook for local storage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Safer math evaluation for the wallet input
export function safeCalculate(expression: string): number {
  try {
    // Only allow numbers and basic math operators
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      return 0;
    }
    // Using Function as a cleaner alternative to eval, strictly bound
    // eslint-disable-next-line no-new-func
    const result = new Function(`return (${expression})`)();
    return isNaN(result) ? 0 : result;
  } catch (e) {
    return 0;
  }
}
