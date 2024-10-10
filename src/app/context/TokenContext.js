'use client';

import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();   
  const [name, setName] = useState();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        saveToken,
        isLoggedIn: !!token,           
        name, 
        setName 
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export default TokenProvider;
