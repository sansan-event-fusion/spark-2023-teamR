import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Container,
  Text,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

export type formInputs = {
  username: string;
  email: string;
  password: string;
  position_id: number;
  company_name: string;
  company_password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch("http://127.0.0.1:8000/api/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        position_id: data.position_id,
        company_name: data.company_name,
        company_password: data.company_password,
      }),
    });
    //登録情報が重複している場合はエラーを表示
    if (response.status === 200) {
      const postedData = await response.json();
      console.log(postedData);
      toast({
        title: "登録成功",
        description: "登録しました",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login");
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.log("すでに登録されています", errorData.message);
      toast({
        title: "登録失敗",
        description: "すでに登録されています",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      console.log("POST失敗", errorData.message);
      toast({
        title: "登録失敗",
        description: "登録に失敗しました",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  });

  return (
    <Box>
      <Container
        paddingTop={6}
        marginTop={10}
        bgColor={"white"}
        border={"1px solid"}
        borderColor={"gray.200"}
        borderRadius={"md"}
        centerContent
      >
        <Text fontSize="3xl" as="b" paddingY={2}>
          新規登録
        </Text>
        <form onSubmit={onSubmit}>
          <Box width="sm" paddingY={6} textAlign={"center"}>
            {/* ユーザー名 */}
            <FormControl isInvalid={Boolean(errors.username)} mb={5}>
              <FormLabel htmlFor="username">ユーザー名</FormLabel>
              <Input
                id="username"
                // 必須と50文字以内のバリデーション
                {...register("username", {
                  required: "必須項目です",
                  maxLength: {
                    value: 50,
                    message: "50文字以内で入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            {/* メールアドレス */}
            <FormControl isInvalid={Boolean(errors.email)} mb={5}>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input
                id="email"
                // 必須、50文字以内、半角英数字メールアドレス形式のバリデーション
                {...register("email", {
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
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mb={5}>
              <FormLabel htmlFor="user_password">パスワード</FormLabel>
              <Input
                id="password"
                // 必須、8文字以上、50文字以内、半角英数字のバリデーション
                {...register("password", {
                  required: "必須項目です",
                  minLength: {
                    value: 8,
                    message: "8文字以上で入力してください",
                  },
                  maxLength: {
                    value: 50,
                    message: "50文字以内で入力してください",
                  },
                  //   pattern: {
                  //     value: /^[0-9a-zA-Z]*$/,
                  //     message: "半角英数字で入力してください",
                  //   },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            {/* ポジションID */}
            <FormControl isInvalid={Boolean(errors.position_id)} mb={5}>
              <FormLabel htmlFor="position_id">ポジションID</FormLabel>
              <Input
                id="position_id"
                // 必須と50文字以内のバリデーション
                {...register("position_id", {
                  required: "必須項目です",
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
                {errors.position_id && errors.position_id.message}
              </FormErrorMessage>
            </FormControl>
            {/* 会社名 */}
            <FormControl isInvalid={Boolean(errors.company_name)} mb={5}>
              <FormLabel htmlFor="company_name">会社名</FormLabel>
              <Input
                id="company_name"
                // 必須と50文字以内のバリデーション
                {...register("company_name", {
                  required: "必須項目です",
                  maxLength: {
                    value: 50,
                    message: "50文字以内で入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.company_name && errors.company_name.message}
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
                  minLength: {
                    value: 4,
                    message: "4文字以上で入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.company_password && errors.company_password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              isLoading={isSubmitting}
              type="submit"
              marginY={6}
              bg={"blue.400"}
              textColor={"white"}
              _hover={{ opacity: 0.8 }}
            >
              新規登録
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};
export { Signup };
