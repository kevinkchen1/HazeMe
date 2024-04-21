import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  // Initialize state from localStorage if it exists, otherwise use an empty array
  const [globalArray, setGlobalArray] = useState(() => {
    const saved = localStorage.getItem('globalArray');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to store state changes to localStorage
  useEffect(() => {
    localStorage.setItem('globalArray', JSON.stringify(globalArray));
  }, [globalArray]);

  return (
    <GlobalStateContext.Provider value={{ globalArray, setGlobalArray }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
