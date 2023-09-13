import React from "react";
import { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  HStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { FaceIcons, Icon } from "./FaceIcons";

const LikeComment = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  //選んだ顔のスタンプを保持する
  const [selectedFace, setSelectedFace] = useState<Icon[]>([]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setValue(inputValue);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    setValue("");
    setSelectedFace(selectedFace);
  };

  const onClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Box maxW="5xl" padding="8" mx="auto" my="auto" textAlign="center">
        <Text fontSize="3xl" mt="8" align={"center"} justifyContent={"center"}>
          タスク名
        </Text>
        <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
          タスク内容
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding={"2"}
        >
          <Text color="gray.500" textAlign={"left"}>
            タスク内容
          </Text>
        </Box>
        <Text color="gray.500" mb="1" mt="4" textAlign={"left"}>
          メモ
        </Text>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          padding={"2"}
          textAlign={"left"}
        >
          <Text color="gray.500">メモ</Text>
        </Box>
        <Text mb="1" mt="4" textAlign={"left"}>
          コメント
        </Text>
        <Textarea
          height="30vh"
          value={value}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
          resize="none"
        />
        <HStack>
          <Popover isOpen={isOpen}>
            <PopoverTrigger>
              <Button
                mt="4"
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
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  style={{ color: "#b0aca6" }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent width="auto" right={-3} marginTop="5px" ml="8">
              <PopoverCloseButton onClick={onClose} />

              <PopoverBody marginY="2" padding={"4"}>
                {/* 顔を選ぶ */}
                <FaceIcons
                  selectedFace={selectedFace}
                  setSelectedFace={setSelectedFace}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* 選んだ顔を表示 */}
          <Box>
            <HStack>
              {selectedFace.map((face) => (
                <FontAwesomeIcon
                  key={face.id}
                  icon={face.icon}
                  style={{ color: face.color }}
                  size={face.size as any}
                  className={face.animation}
                />
              ))}
            </HStack>
          </Box>
        </HStack>

        <Button
          bg="blue.400"
          mt="4"
          ml="4"
          textColor={"white"}
          _hover={{ opacity: 0.8 }}
          onClick={handleSubmit}
        >
          送信
        </Button>
      </Box>
    </>
  );
};

export default LikeComment;
