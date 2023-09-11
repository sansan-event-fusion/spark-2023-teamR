import React from "react";
import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Input,
  Text,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { AddIcon, Icon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

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
    // 左のタスクリスト -------------------------------------------------------------------------------------------
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
      {/* ---------------------------------------------------------------------------------------------------- */}

      <Flex w="100%" mt="8" justify="center">
        <Box w="80%">
          <center>
            <Text as="b" fontSize="3xl">
              得られる力 : {buttonStates.find((button) => button.active)?.name}
              <br />
            </Text>
          </center>

          <VStack
            divider={<StackDivider borderColor="gray.300" />}
            spacing={4}
            mt="4"
            align="stretch"
          >
            {/* 完了したタスク */}
            <Box
              rounded="lg"
              border="1px solid"
              p={4}
              borderColor="gray.300"
              bg="blue.300"
            >
              <Flex justifyContent="space-between">
                <FontAwesomeIcon
                  size="xl"
                  icon={faCircleCheck}
                  style={{ color: "#1275ae" }}
                />
                <Text>タスク</Text>
                <FontAwesomeIcon
                  size="xl"
                  icon={faCircleCheck}
                  style={{ color: "#63B3ED" }}
                />
              </Flex>
            </Box>
            {/* 実行中のタスク */}
            <Box
              rounded="lg"
              border="1px solid"
              p={4}
              borderColor="gray.300"
              bg="yellow.200"
            >
              <Flex justifyContent={"space-between"}>
                <FontAwesomeIcon
                  icon={faPersonRunning}
                  size="xl"
                  style={{ color: "#b19218" }}
                  shake
                />
                <Text>タスク</Text>
                <FontAwesomeIcon
                  size="xl"
                  icon={faCircleCheck}
                  style={{ color: "#EDDEA4" }}
                />
              </Flex>
            </Box>
            {/* 実行予定のタスク */}
            <Box rounded="lg" border="1px solid" p={4} borderColor="gray.300">
              <Flex justifyContent={"space-between"}>
                <FontAwesomeIcon
                  size="xl"
                  icon={faCircleCheck}
                  style={{ color: "#d9d9d9" }}
                />
                <Text color="gray.400">タスク</Text>
                <FontAwesomeIcon
                  size="xl"
                  icon={faCircleCheck}
                  style={{ color: "#E2EAF4" }}
                />
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default FolderTaskList;
