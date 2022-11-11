import { createContext } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuthUser] = useSessionStorage("authData", null);
  return (
    <AuthContext.Provider value={{ auth, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
