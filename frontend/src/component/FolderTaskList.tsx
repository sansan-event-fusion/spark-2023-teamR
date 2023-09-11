import { useState } from "react";
import {
  Flex,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  FormLabel,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import TaskList from "./TaskList";

function FolderTaskList() {
  const [buttonBeforeIndex, setButtonBeforeIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [vision, setVision] = useState("");
  const [error, setError] = useState("");
  const [buttonStates, setButtonStates] = useState([
    { folderName: "ボタン1", vision: "ボタン1のビジョン", active: true },
    { folderName: "ボタン2", vision: "ボタン2のビジョン", active: false },
    { folderName: "ボタン3", vision: "ボタン3のビジョン", active: false },
  ]);

  const handleFolderButtonClick = (index: number) => {
    const updatedButtonStates = [...buttonStates];
    updatedButtonStates[buttonBeforeIndex].active = false;
    updatedButtonStates[index].active = true;

    setButtonStates(updatedButtonStates);
    setButtonBeforeIndex(index);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    if (vision.trim() === "" || folderName.trim() === "") {
      setError("入力必須です。空白は使用できません");
    } else {
      const newButtonState = {
        folderName: folderName,
        vision: vision,
        active: false,
      };

      const updatedButtonStates = [...buttonStates, newButtonState];
      setButtonStates(updatedButtonStates);
      setVision("");
      setFolderName("");
      onClose();
    }
  };

  const onClose = () => {
    setIsOpen(false);
    setError("");
    setError("");
  };

  return (
    <Flex h="100vh" bg="blue.100">
      <Flex direction="column" bg="white" w="120px">
        {buttonStates.map((button, index) => (
          <Button
            rounded="none"
            key={button.folderName}
            onClick={() => handleFolderButtonClick(index)}
            bg={button.active ? "blue.100" : "white"}
            size="lg"
          >
            {button.folderName}
          </Button>
        ))}
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
      </Flex>

      <TaskList buttonStates={buttonStates} />
    </Flex>
  );
}

export default FolderTaskList;
