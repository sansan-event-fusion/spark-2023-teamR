import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Box,
  useToast,
} from "@chakra-ui/react";

//自動ログイン機能は後で実装

type formInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const onSubmit = handleSubmit(async (data) => {
    console.log("POSTするデータ：", data);
    //curl -X POST http://127.0.0.1:8000/api/signin/ -H "Content-Type: application/json" -d '{"email": "admin@example.com", "password": "admin_password"}'{"url": "redirect to succcess page"}
    const response = await fetch("http://127.0.0.1:8000/api/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_address: data.email,
        user_password: data.password,
      }),
    });
    const postedData = await response.json();
    console.log("POSTできたデータ：", postedData);
    //ログイン成功時の処理と失敗の処理
    if (postedData.status === "success") {
      toast({
        title: "ログインしました",
        status: "success",
        position: "top",
        colorScheme: "blue",
        duration: 3000,
        isClosable: true,
      });
      navigate("/fresherTop");
    } else {
      //失敗の内容をコンソールに表示
      console.log(postedData.error.message);
      toast({
        title: "ログインに失敗しました",
        status: "error",
        position: "top",
        colorScheme: "red",
        duration: 3000,
        isClosable: true,
      });
    }
    onClickLogin();
  });

  const onClickLogin = async () => {
    navigate("/fresherTop");
  };

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
          ログイン
        </Text>

        <form onSubmit={onSubmit}>
          <Box width="sm" paddingY={6} textAlign={"center"}>
            <FormControl isInvalid={Boolean(errors.email)} paddingBottom={6}>
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
            <FormControl isInvalid={Boolean(errors.password)} paddingBottom={6}>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
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
                  // pattern: {
                  //   value: /^[0-9a-zA-Z]*$/,
                  //   message: "半角英数字で入力してください",
                  // },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
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
              ログイン
            </Button>
          </Box>
        </form>
      </Container>
      <Container p={8} centerContent>
        <Text>新規登録はこちら</Text>
        <Button
          onClick={() => navigate("/signup")}
          m={2}
          variant={"outline"}
          borderColor={"blue.400"}
          textColor={"blue.400"}
          _hover={{ opacity: 0.8 }}
        >
          新規登録
        </Button>
      </Container>
    </Box>
  );
};

export { Login };
