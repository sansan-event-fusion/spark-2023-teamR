import React from "react";
import { useState } from "react";
import {
  Box,
  Text,
  VStack,
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

import {
  faFaceSmile,
  faFaceSmileWink,
  faFaceSurprise,
  faFaceKissWinkHeart,
  faFaceGrinSquintTears,
  faFaceGrinBeamSweat,
  faFaceGrimace,
  faFaceDizzy,
  faFaceMehBlank,
  faFaceGrinHearts,
  faFaceGrinTongueSquint,
} from "@fortawesome/free-regular-svg-icons";

// 表示に必要そうなデータ
type Props = {
  taskName: string;
  taskContent: string;
  memo: string;
};

function LikeComment() {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [reactions, setReactions] = useState<number[]>([]);

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setValue(inputValue);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleStampClick = (stampNum: number) => {
    setReactions([...reactions, stampNum]);
  };

  const handleSubmit = () => {
    setValue("");
    setReactions([]);
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
            <PopoverContent width="auto" right={0} marginTop="5px">
              <PopoverCloseButton onClick={onClose} />

              <PopoverBody marginY="2" padding={"4"}>
                <VStack>
                  <HStack spacing={"6"} padding={"4"}>
                    <Button bg="none" onClick={() => handleStampClick(0)}>
                      <FontAwesomeIcon
                        icon={faFaceSmileWink}
                        style={{ color: "#fbd92e" }}
                        size="2xl"
                        bounce
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(1)}>
                      <FontAwesomeIcon
                        icon={faFaceSurprise}
                        size="2xl"
                        spin
                        style={{ color: "#f503f6" }}
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(2)}>
                      <FontAwesomeIcon
                        icon={faFaceKissWinkHeart}
                        style={{ color: "#fe3d7f" }}
                        beatFade
                        size="2xl"
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(3)}>
                      <FontAwesomeIcon
                        icon={faFaceGrinSquintTears}
                        shake
                        style={{ color: "#26a3ef" }}
                        size="2xl"
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(4)}>
                      <FontAwesomeIcon
                        icon={faFaceGrinBeamSweat}
                        size="2xl"
                        style={{ color: "#7bb241" }}
                      />
                    </Button>
                  </HStack>
                  <HStack spacing={"6"} padding={"4"}>
                    <Button bg="none" onClick={() => handleStampClick(5)}>
                      <FontAwesomeIcon
                        icon={faFaceGrimace}
                        style={{ color: "#f1a900" }}
                        size="2xl"
                        bounce
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(6)}>
                      <FontAwesomeIcon
                        icon={faFaceDizzy}
                        size="2xl"
                        spin
                        style={{ color: "#9f9f9f" }}
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(7)}>
                      <FontAwesomeIcon
                        icon={faFaceGrinHearts}
                        beatFade
                        size="2xl"
                        style={{ color: "#ea3f79" }}
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(8)}>
                      <FontAwesomeIcon
                        icon={faFaceGrinTongueSquint}
                        style={{ color: "#5d17f6" }}
                        shake
                        size="2xl"
                      />
                    </Button>
                    <Button bg="none" onClick={() => handleStampClick(9)}>
                      <FontAwesomeIcon
                        icon={faFaceMehBlank}
                        size="2xl"
                        style={{ color: "#ad2c27" }}
                      />
                    </Button>
                  </HStack>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {reactions.map((stampNumber) => {
            switch (stampNumber) {
              case 0:
                return (
                  <FontAwesomeIcon
                    icon={faFaceSmileWink}
                    style={{ color: "#fbd92e" }}
                    size="2xl"
                    bounce
                  />
                );
              case 1:
                return (
                  <FontAwesomeIcon
                    icon={faFaceSurprise}
                    size="2xl"
                    spin
                    style={{ color: "#f503f6" }}
                  />
                );
              case 2:
                return (
                  <FontAwesomeIcon
                    icon={faFaceKissWinkHeart}
                    style={{ color: "#fe3d7f" }}
                    beatFade
                    size="2xl"
                  />
                );
              case 3:
                return (
                  <FontAwesomeIcon
                    icon={faFaceGrinSquintTears}
                    shake
                    style={{ color: "#26a3ef" }}
                    size="2xl"
                  />
                );
              case 4:
                return (
                  <FontAwesomeIcon
                    icon={faFaceGrinBeamSweat}
                    size="2xl"
                    style={{ color: "#7bb241" }}
                  />
                );
              case 5:
                return (
                  <FontAwesomeIcon
                    icon={faFaceGrimace}
                    style={{ color: "#f1a900" }}
                    size="2xl"
                    bounce
                  />
                );
              case 6:
                return (
                  <FontAwesomeIcon
                    icon={faFaceDizzy}
                    size="2xl"
                    spin
                    style={{ color: "#9f9f9f" }}
                  />
                );
              case 7:
                return (
                  <FontAwesomeIcon
                    icon={faFaceGrinHearts}
                    beatFade
                    size="2xl"
                    style={{ color: "#ea3f79" }}
                  />
                );
              case 8:
                return (
                  <FontAwesomeIcon
                    icon={faFaceGrinTongueSquint}
                    style={{ color: "#5d17f6" }}
                    shake
                    size="2xl"
                  />
                );
              case 9:
                return (
                  <FontAwesomeIcon
                    icon={faFaceMehBlank}
                    size="2xl"
                    style={{ color: "#ad2c27" }}
                  />
                );
            }
            return false;
          })}
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
}

export default LikeComment;
