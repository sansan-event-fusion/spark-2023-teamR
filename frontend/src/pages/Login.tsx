import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

//自動ログイン機能は後で実装

const Login = () => {
  const navigate = useNavigate();

  const onClickLogin = async () => {
    const userAddress = document.querySelector(
      'input[type="user-address"]'
    ) as HTMLInputElement;
    const userPassword = document.querySelector(
      'input[type="user-password"]'
    ) as HTMLInputElement;
    console.log(
      "address:",
      userAddress.value,
      "/ password:",
      userPassword.value
    );
    navigate("/fresherTop");
  };

  return (
    <Card>
      <Text>ログイン</Text>
      <FormControl>
        <FormLabel>メールアドレス</FormLabel>
        <Input type="user-address" />
        <FormLabel>パスワード</FormLabel>
        <Input type="user-password" />
      </FormControl>

      <Button onClick={onClickLogin}>ログイン</Button>
    </Card>
  );
};

export { Login };
