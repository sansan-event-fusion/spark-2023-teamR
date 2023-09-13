import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../AuthContext";

const Logout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onClickLogout = () => {
    setAuth({ token: "" });
    navigate("/login");
  };
  return <Button onClick={onClickLogout}>ログアウト</Button>;
};

export { Logout };
