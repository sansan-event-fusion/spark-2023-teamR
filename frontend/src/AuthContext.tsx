import React, { useEffect, useState } from "react";
import { useContext } from "react";

type Auth = {
  token: string;
};
type AuthContextType = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

const LoginContext = React.createContext<boolean>(false);

const AuthContext = React.createContext<AuthContextType>({
  auth: { token: "" },
  setAuth: () => {},
});

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth>({ token: "" });

  useEffect(() => {
    if (auth?.token) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [auth]);

  return (
    <LoginContext.Provider value={login}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </LoginContext.Provider>
  );
};

export { AuthProvider, useAuth };
