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
import { Folders } from "../../type/Types";

type Props = {
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
};

const CreateFolderButton = ({
  folders,
  setFolders,
  setActiveFolderId,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [vision, setVision] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (vision.trim() === "" || title.trim() === "") {
      setError("入力必須です。空白は使用できません");
    } else {
      const createFolderContents = {
        id: folders.length + 1,
        title: title,
        vision: vision,
        tasks: [],
      };
      setFolders([...folders, createFolderContents]);
      setActiveFolderId(createFolderContents.id);
      setTitle("");
      setVision("");
      onClose();
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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
