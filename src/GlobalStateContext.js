import React, { createContext, useState, useContext, useEffect } from 'react';

const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const [globalArray, setGlobalArray] = useState(() => {
      const saved = localStorage.getItem('globalArray');
      return saved ? JSON.parse(saved) : [];
  });

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
