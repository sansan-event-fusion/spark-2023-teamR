import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

//自動ログイン機能は後で実装

type formInputs = {
  user_address: string;
  user_password: string;
};

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    onClickLogin();
  });

  const onClickLogin = async () => {
    navigate("/fresherTop");
  };

  return (
    <Card>
      <Text>ログイン</Text>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={Boolean(errors.user_address)} mb={5}>
          <FormLabel htmlFor="email">メールアドレス</FormLabel>
          <Input
            id="email"
            // 必須、50文字以内、半角英数字メールアドレス形式のバリデーション
            {...register("user_address", {
              required: "必須項目です",
              maxLength: {
                value: 50,
                message: "50文字以内で入力してください",
              },
              pattern: {
                value: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+$/,
                message: "メールアドレスを入力してください",
              },
            })}
          />
          <FormErrorMessage>
            {errors.user_address && errors.user_address.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.user_password)}>
          <FormLabel>パスワード</FormLabel>
          <Input
            type="user-password"
            {...register("user_password", {
              required: "必須項目です",
              minLength: { value: 8, message: "8文字以上で入力してください" },
              maxLength: {
                value: 50,
                message: "50文字以内で入力してください",
              },
              pattern: {
                value: /^[0-9a-zA-Z]*$/,
                message: "半角英数字で入力してください",
              },
            })}
          />
          <FormErrorMessage>
            {errors.user_password && errors.user_password.message}
          </FormErrorMessage>
        </FormControl>

        <Button isLoading={isSubmitting} type="submit">
          ログイン
        </Button>

        <Text>新規登録はこちら</Text>
        <Button onClick={() => navigate("/signup")}>新規登録</Button>
      </form>
    </Card>
  );
};

export { Login };
