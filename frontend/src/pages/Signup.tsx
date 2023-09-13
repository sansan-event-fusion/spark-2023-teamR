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
  user_name: string;
  user_address: string;
  user_password: string;
  user_passwordConfirm: string;
  company_id: string;
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

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    toast({
      title: "登録しました",
      status: "success",
      position: "top",
      colorScheme: "blue",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
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
            <FormControl isInvalid={Boolean(errors.user_name)} mb={4}>
              <FormLabel htmlFor="name" fontSize="sm">
                ユーザー名
              </FormLabel>
              <Input
                id="name"
                size="sm"
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
            <FormControl isInvalid={Boolean(errors.user_address)} mb={4}>
              <FormLabel htmlFor="email" fontSize="sm">
                メールアドレス
              </FormLabel>
              <Input
                id="email"
                size="sm"
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
            <FormControl isInvalid={Boolean(errors.user_password)} mb={4}>
              <FormLabel htmlFor="user_password" fontSize="sm">
                パスワード
              </FormLabel>
              <InputGroup>
                <Input
                  id="user_password"
                  size="sm"
                  type={showPassword ? "text" : "password"}
                  // 必須、8文字以上、50文字以内、半角英数字のバリデーション
                  {...register("user_password", {
                    required: "必須項目です",
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください",
                    },
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
                {errors.user_password && errors.user_password.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={Boolean(errors.user_passwordConfirm)}
              mb={4}
            >
              <FormLabel htmlFor="user_passwordConfirm" fontSize="sm">
                確認パスワード
              </FormLabel>
              <InputGroup>
                <Input
                  id="user_passwordConfirm"
                  size="sm"
                  type={showPasswordConfirm ? "text" : "password"}
                  // 必須、8文字以上、50文字以内、半角英数字、パスワードと一致するかのバリデーション
                  {...register("user_passwordConfirm", {
                    required: "必須項目です",
                    minLength: {
                      value: 8,
                      message: "8文字以上で入力してください",
                    },
                    maxLength: {
                      value: 50,
                      message: "50文字以内で入力してください",
                    },
                    pattern: {
                      value: /^[0-9a-zA-Z]*$/,
                      message: "半角英数字で入力してください",
                    },
                    validate: (value) =>
                      value === getValues("user_password") ||
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
                {errors.user_passwordConfirm &&
                  errors.user_passwordConfirm.message}
              </FormErrorMessage>
            </FormControl>

            <Box position="relative" paddingY={6}>
              <Divider />
              <AbsoluteCenter bg="white" px="4">
                会社情報
              </AbsoluteCenter>
            </Box>

            {/* 会社ID */}
            <FormControl isInvalid={Boolean(errors.company_id)} mb={4}>
              <FormLabel htmlFor="company_id" fontSize="sm">
                会社ID
              </FormLabel>
              <Input
                id="company_id"
                size="sm"
                // 必須と50文字以内のバリデーション
                {...register("company_id", {
                  required: "必須項目です",
                  minLength: {
                    value: 4,
                    message: "4文字以上で入力してください",
                  },
                })}
              />
              <FormErrorMessage>
                {errors.company_id && errors.company_id.message}
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
