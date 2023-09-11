import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Card,
  Text,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

type formInputs = {
  user_name: string;
  user_address: string;
  user_password: string;
  company_id: string;
  company_password: string;
};

const Signup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit((data) => {
    // フォームで入力されたデータをコンソールに表示
    console.log(data);
    navigate("/login");
  });

  return (
    <>
      <Card>
        <Text>新規登録</Text>{" "}
        <form onSubmit={onSubmit}>
          {/* ユーザー名 */}
          <FormControl isInvalid={Boolean(errors.user_name)} mb={5}>
            <FormLabel htmlFor="name">ユーザー名</FormLabel>
            <Input
              id="name"
              // 必須と50文字以内のバリデーション
              {...register("user_name", {
                required: "必須項目です",
                maxLength: {
                  value: 50,
                  message: "50文字以内で入力してください",
                },
              })}
            />
            <FormErrorMessage>
              {errors.user_name && errors.user_name.message}
            </FormErrorMessage>
          </FormControl>
          {/* メールアドレス */}
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
                  value: /^[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_\.]+$/,
                  message: "メールアドレスを入力してください",
                },
              })}
            />
            <FormErrorMessage>
              {errors.user_address && errors.user_address.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.user_password)} mb={5}>
            <FormLabel htmlFor="user_password">パスワード</FormLabel>
            <Input
              id="user_password"
              // 必須、8文字以上、50文字以内、半角英数字のバリデーション
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
          {/* 会社ID */}
          <FormControl isInvalid={Boolean(errors.company_id)} mb={5}>
            <FormLabel htmlFor="company_id">会社ID</FormLabel>
            <Input
              id="company_id"
              // 必須と50文字以内のバリデーション
              {...register("company_id", {
                required: "必須項目です",
                minLength: { value: 8, message: "8文字以上で入力してください" },
              })}
            />
            <FormErrorMessage>
              {errors.company_id && errors.company_id.message}
            </FormErrorMessage>
          </FormControl>
          {/* 会社パスワード */}
          <FormControl isInvalid={Boolean(errors.company_password)} mb={5}>
            <FormLabel htmlFor="company_password">会社パスワード</FormLabel>
            <Input
              id="company_password"
              // 必須と50文字以内のバリデーション
              {...register("company_password", {
                required: "必須項目です",
                minLength: { value: 8, message: "8文字以上で入力してください" },
              })}
            />
            <FormErrorMessage>
              {errors.company_password && errors.company_password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={4}
            colorScheme="blue"
            isLoading={isSubmitting}
            type="submit"
          >
            新規登録
          </Button>
        </form>
      </Card>
    </>
  );
};
export { Signup };
