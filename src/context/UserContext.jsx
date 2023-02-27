import { createContext, useState } from "react";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsUserLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isUserLoggedIn, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
export default ContextProvider;
