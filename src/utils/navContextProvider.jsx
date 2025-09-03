'use client'

import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
  const [navProps, setNavProps] = useState({});

  return (
    <NavContext.Provider value={{ navProps, setNavProps }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);