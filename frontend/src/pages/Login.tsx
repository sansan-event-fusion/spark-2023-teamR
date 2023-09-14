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
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";

type formInputs = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>();

  const getUser_Initial = async (token: string) => {
    const response = await fetch(`${accessPointURL}check_token/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (response.status === 401) {
      console.log("tokenが無効です");
    } else if (response.status === 200) {
      const responseData = await response.json();
      navigate(responseData.position_id === 1 ? "/fresherTop" : "/elderTop");
    } else {
      console.log("GET失敗");
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(`${accessPointURL}signin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log("POST成功:", responseData.token);
      setAuth({ token: responseData.token });
      toast({
        title: "ログインしました",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      getUser_Initial(responseData.token);
    } else {
      const errorData = await response.json();
      console.log("POST失敗", errorData.message);
      toast({
        title: "ログインできませんでした",
        description: errorData.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  });
  const handleClickPassword = () => setShowPassword(!showPassword);
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
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
                  })}
                />
                <InputRightElement
                  marginRight={2}
                  height={"100%"}
                  onClick={handleClickPassword}
                >
                  {showPassword ? (
                    <Icon as={ViewIcon} />
                  ) : (
                    <Icon as={ViewOffIcon} />
                  )}
                </InputRightElement>
              </InputGroup>
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
