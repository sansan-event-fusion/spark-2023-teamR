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
  Divider,
  AbsoluteCenter,
  InputRightElement,
  InputGroup,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

type formInputs = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
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
    getValues,
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
        password1: data.password,
        password2: data.passwordConfirm,
        email: data.email,
        position_id: data.position_id,
        company_name: data.company_name,
        company_password: data.company_password,
      }),
    });
    if (response.status === 201) {
      const postedData = await response.json();
      console.log(postedData);
      toast({
        title: "登録しました",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.log(
        "入力されたユーザー名またはメールアドレスは、すでに登録されています。",
        errorData.message
      );
      toast({
        title: "登録失敗",
        description:
          "入力されたユーザー名またはメールアドレスは、すでに登録されています。",
        status: "error",
        position: "top",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      console.log("POST失敗", errorData);
      toast({
        title: "登録できませんでした",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const handleClickPasswordConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  return (
    <Box maxH="100%" maxW="80%" margin="auto">
      <Container
        paddingTop={6}
        marginTop={10}
        bgColor={"white"}
        border={"1px solid"}
        borderColor={"gray.200"}
        borderRadius={"md"}
        centerContent
      >
        <Text fontSize="2xl" as="b" paddingY={1}>
          新規登録
        </Text>
        <form onSubmit={onSubmit}>
          <Box width="sm" paddingY={2} textAlign={"center"}>
            <Box position="relative" paddingY={6}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                個人情報
              </AbsoluteCenter>
            </Box>

            {/* ユーザー名 */}
            <FormControl isInvalid={Boolean(errors.username)} mb={4}>
              <FormLabel htmlFor="name" fontSize="sm">
                ユーザー名
              </FormLabel>
              <Input
                id="name"
                size="sm"
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
            <FormControl isInvalid={Boolean(errors.email)} mb={4}>
              <FormLabel htmlFor="email" fontSize="sm">
                メールアドレス
              </FormLabel>
              <Input
                id="email"
                size="sm"
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
            <FormControl isInvalid={Boolean(errors.password)} mb={4}>
              {/* パスワード */}
              <FormLabel htmlFor="password" fontSize="sm">
                パスワード
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  size="sm"
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

            {/* パスワード確認 */}
            <FormControl isInvalid={Boolean(errors.passwordConfirm)} mb={4}>
              <FormLabel htmlFor="passwordConfirm" fontSize="sm">
                確認パスワード
              </FormLabel>
              <InputGroup>
                <Input
                  id="passwordConfirm"
                  size="sm"
                  type={showPasswordConfirm ? "text" : "password"}
                  {...register("passwordConfirm", {
                    required: "必須項目です",
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください",
                    },
                    maxLength: {
                      value: 50,
                      message: "50文字以内で入力してください",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "パスワードが一致しません",
                  })}
                />
                <InputRightElement
                  marginRight={2}
                  height={"100%"}
                  onClick={handleClickPasswordConfirm}
                >
                  {showPasswordConfirm ? (
                    <Icon as={ViewIcon} />
                  ) : (
                    <Icon as={ViewOffIcon} />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </FormErrorMessage>
            </FormControl>

            <Box position="relative" paddingY={6}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                会社情報
              </AbsoluteCenter>
            </Box>

            {/* ポジションID */}
            <FormControl isInvalid={Boolean(errors.position_id)} mb={5}>
              <FormLabel htmlFor="position_id">ポジションID</FormLabel>
              <Input
                id="position_id"
                size="sm"
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

            {/* 会社ID */}
            <FormControl isInvalid={Boolean(errors.company_name)} mb={4}>
              <FormLabel htmlFor="company_name" fontSize="sm">
                会社ID
              </FormLabel>
              <Input
                id="company_name"
                size="sm"
                {...register("company_name", {
                  required: "必須項目です",
                  minLength: {
                    value: 4,
                    message: "4文字以上で入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.company_name && errors.company_name.message}
              </FormErrorMessage>
            </FormControl>

            {/* 会社パスワード */}
            <FormControl isInvalid={Boolean(errors.company_password)} mb={4}>
              <FormLabel htmlFor="company_password" fontSize="sm">
                会社パスワード
              </FormLabel>
              <Input
                id="company_password"
                size="sm"
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
