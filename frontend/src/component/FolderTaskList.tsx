import React from "react";
import { useState } from "react";
import { Flex, Button, Input } from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import TaskList from "./TaskList";

function FolderTaskList() {
  const [buttonBeforeIndex, setButtonBeforeIndex] = useState<number>(0);
  const [buttonStates, setButtonStates] = useState([
    { name: "ボタン1", active: true },
    { name: "ボタン2", active: false },
    { name: "ボタン3", active: false },
  ]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleFolderButtonClick = (index: number) => {
    const updatedButtonStates = [...buttonStates];
    updatedButtonStates[buttonBeforeIndex].active = false;
    updatedButtonStates[index].active = true;

    setButtonStates(updatedButtonStates);
    setButtonBeforeIndex(index);
  };

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };

  const handleFocus = () => {
    setIsButtonClicked(false);
    setInputValue("");
  };

  const handleEnterPress = (e: { key: string }) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newButtonState = { name: inputValue, active: false };
      const updatedButtonStates = [...buttonStates, newButtonState];
      setButtonStates(updatedButtonStates);
      setInputValue("");
      setIsButtonClicked(false);
    }
  };

  return (
    <Flex h="100vh" bg="blue.100">
      <Flex direction="column" bg="white" w="120px">
        {buttonStates.map((button, index) => (
          <Button
            rounded="none"
            key={button.name}
            onClick={() => handleFolderButtonClick(index)}
            bg={button.active ? "blue.100" : "white"}
            size="lg"
          >
            {button.name}
          </Button>
        ))}
        {isButtonClicked ? (
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleEnterPress}
            onBlur={handleFocus}
            autoFocus
          />
        ) : (
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
        )}
      </Flex>

      <TaskList buttonStates={buttonStates} />
    </Flex>
  );
}

export default FolderTaskList;
