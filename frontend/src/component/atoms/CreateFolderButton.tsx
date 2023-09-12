import {
  Button,
  Flex,
  PopoverFooter,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Popover,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import { useState } from "react";

type ButtonStates = {
  buttonStates: {
    folderName: string;
    vision: string;
    active: boolean;
  }[];
  setButtonStates: React.Dispatch<
    React.SetStateAction<
      {
        folderName: string;
        vision: string;
        active: boolean;
      }[]
    >
  >;
};

const CreateFolderButton = ({
  buttonStates,
  setButtonStates,
}: ButtonStates) => {
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [vision, setVision] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (vision.trim() === "" || folderName.trim() === "") {
      setError("入力必須です。空白は使用できません");
    } else {
      const newButtonState = {
        folderName: folderName,
        vision: vision,
        active: true,
      };

      const updatedButtonStates = [...buttonStates, newButtonState];
      setButtonStates(updatedButtonStates);
      setVision("");
      setFolderName("");
      onClose();
      console.log(buttonStates);
    }
  };
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const onClose = () => {
    setIsOpen(false);
    setError("");
  };
  return (
    <Popover placement="right" isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          bg={"white"}
          p={4}
          _hover={{
            bg: "gray.100",
            ".rotate-icon": {
              transform: "rotate(90deg)",
              transition: "transform 0.3s",
            },
          }}
          onClick={handleButtonClick}
        >
          <Icon as={AddIcon} className="rotate-icon" />
        </Button>
      </PopoverTrigger>
      <PopoverContent width="auto" right={0} marginTop="5px">
        <PopoverArrow />
        <PopoverCloseButton onClick={onClose} />
        <PopoverHeader>
          <center>フォルダの追加</center>
        </PopoverHeader>
        <PopoverBody marginY="2">
          <FormControl isInvalid={Boolean(error)}>
            <FormLabel w="60vh" marginX="2" marginY="2">
              フォルダ名
            </FormLabel>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(error)}>
            <FormLabel w="60vh" marginX="2" marginY="2">
              ビジョン
            </FormLabel>
            <Input
              id="vision"
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              isInvalid={vision.length === 0}
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>
        </PopoverBody>
        <PopoverFooter border="none">
          <Flex justifyContent="flex-end">
            <Button
              colorScheme="blue"
              type="submit"
              mr={3}
              onClick={handleSubmit}
              mb="4"
            >
              追加
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export { CreateFolderButton };
