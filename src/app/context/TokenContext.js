'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
// Importamos js-cookie
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const TokenContext = createContext();

export const useAuth = () => {
  return useContext(TokenContext);
};

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState();   
  const [name, setName] = useState();
  const router = useRouter();

  useEffect(() => {
    // Obtenemos el token desde la cookie llamada 'user'
    const storedToken = Cookies.get('user');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    // Guardamos el token en la cookie con el nombre 'user'
    Cookies.set('user', newToken, { expires: 7 }); // El token expirará en 7 días
    setToken(newToken);
  };

  const logout = () => {
    Cookies.remove("user");
    //localStorage.removeItem("user");
    setToken(null);
    router.push("./login");
    
}


  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        saveToken,
        isLoggedIn: !!token,           
        name, 
        setName,logout
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
