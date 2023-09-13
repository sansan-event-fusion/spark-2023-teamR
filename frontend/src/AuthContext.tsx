import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { accessPointURL } from "./api/accessPoint";
import { Auth, User } from "./type/Types";
type AuthContextType = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  user: User;
};
const LoginContext = React.createContext<boolean>(false);
const AuthContext = React.createContext<AuthContextType>({
  auth: { token: "" },
  setAuth: () => {},
  user: {
    id: 0,
    username: "",
    email: "",
    is_staff: false,
    is_superuser: false,
    date_joined: "",
    last_login: "",
    company_id: 0,
    position_id: 0,
    count_emotions: 0,
    count_comment: 0,
  },
});
const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth>({ token: "" });
  const [user, setUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    is_staff: false,
    is_superuser: false,
    date_joined: "",
    last_login: "",
    company_id: 0,
    position_id: 0,
    count_emotions: 0,
    count_comment: 0,
  });
  const getUser = async (token: string) => {
    const response = await fetch(`${accessPointURL}check_token/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (response.status === 401) {
      console.log("tokenが無効です");
      setLogin(false);
      return;
    } else if (response.status === 200) {
      const responseData = await response.json();
      console.log("GET成功:", responseData);
      setUser(responseData);
    } else {
      console.log("GET失敗");
    }
  };
  useEffect(() => {
    if (auth.token !== undefined) {
      console.log("auth.token:", auth.token);
      getUser(auth.token);
      setLogin(true);
    } else {
      console.log("token 取得失敗");
      setLogin(false);
    }
  }, [auth]);
  return (
    <LoginContext.Provider value={login}>
      <AuthContext.Provider value={{ auth, setAuth, user }}>
        {children}
      </AuthContext.Provider>
    </LoginContext.Provider>
  );
};
export { AuthProvider, useAuth };
