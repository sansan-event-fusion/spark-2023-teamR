import React, { useEffect, useState } from "react";
import Commenter from "../component/atoms/Commenter";

import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Comments, Task, Emotions } from "../type/Types";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { FaceIcons, iconList } from "../component/likes_comments/FaceIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { Icon } from "../component/likes_comments/FaceIcons";

const DoneTaskPage = ({ task }: { task: Task }) => {
  const [comments, setComments] = useState<Comments>([]);
  const [emotions, setEmotions] = useState<Emotions>([]);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  //選んだ顔のスタンプを保持する
  const [selectedFace, setSelectedFace] = useState<Icon[]>([]);
  const toast = useToast();

  const face_types = [
    "smile",
    "surprise",
    "kiss",
    "squint",
    "beam",
    "grimace",
    "dizzy",
    "hearts",
    "tongue",
    "blank",
  ];

  const emotionMap: { [key: string]: number } = {
    smile: 1,
    suprise: 2,
    kiss: 3,
    squint: 4,
    beam: 5,
    grimace: 6,
    dizzy: 7,
    hearts: 8,
    tongue: 9,
    blank: 10,
  };

  const { user, auth } = useAuth();

  const getComments = async (token: string, taskId: number) => {
    const response = await fetch(
      `${accessPointURL}comment/?task_id=${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      setComments(responseData);
    } else {
    }
  };

  const getEmotions = async (token: string, taskId: number) => {
    const response = await fetch(
      `${accessPointURL}emotion/?task_id=${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      setEmotions(responseData);
    } else {
      console.log("comment GET 失敗");
    }
  };

  const postComment = async (token: string, taskId: number) => {
    const postCommentContents = {
      task_id: taskId,
      content: value,
    };
    const response = await fetch(`${accessPointURL}comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth.token}`,
      },
      body: JSON.stringify(postCommentContents),
    });
    if (response.status === 201) {
      toast({
        title: "コメントを送信しました。",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();
      toast({
        title: "コメントを送信できませんでした",
        description: errorData.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const postEmotion = async (token: string, taskId: number, faceId: number) => {
    const postEmotionContent = {
      task_id: taskId,
      emotion_type: face_types[faceId - 1],
    };
    const response = await fetch(`${accessPointURL}emotion/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth.token}`,
      },
      body: JSON.stringify(postEmotionContent),
    });
    if (response.status === 201) {
      toast({
        title: "リアクションをを送信しました。",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const errorData = await response.json();

      toast({
        title: "リアクションを送信できませんでした",
        description: errorData.message,
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    postComment(auth.token, task.id);
    selectedFace.map((face) => postEmotion(auth.token, task.id, face.id));
    setValue("");
    setSelectedFace([]);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      getComments(auth.token, task.id);
      getEmotions(auth.token, task.id);
    } else {
      console.log("auth.tokenがundefinedです");
    }
  }, [auth.token, task.id, task]);

  return (
    <Box w="360px" mx="auto" textAlign="center">
      <Text fontSize="3xl" mt="8" align={"center"} justifyContent={"center"}>
        {task.title}
      </Text>
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        タスク内容
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {task.content}
        </Text>
      </Box>
      <Text color="gray.500" mb="1" mt="4" textAlign={"left"}>
        メモ
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {task.memo}
        </Text>
      </Box>

      {user.position_id !== 1 ? (
        <>
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
        </>
      ) : (
        <>
          <Text mb="1" mt="4" textAlign={"left"}>
            コメント
          </Text>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            padding={"2"}
            textAlign={"left"}
            minH="200px"
          >
            {comments.length === 0 && (
              <Box>
                <Text fontSize="2xl">コメントがありません</Text>
              </Box>
            )}
            {comments.map((comment) => (
              <Commenter
                sender_username={comment.sender_username}
                position={comment.position}
                content={comment.content}
                id={0}
              />
            ))}
          </Box>

          <HStack mt={"8"}>
            {emotions.map((emotion) => (
              <Box>
                {iconList.map((icon) => (
                  <Box>
                    {emotionMap[emotion.emotion_type] === icon.id && (
                      <Box>
                        <FontAwesomeIcon
                          icon={icon.icon}
                          style={{ color: icon.color }}
                          size={icon.size as any}
                          className={icon.animation}
                        />
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            ))}
          </HStack>
        </>
      )}
    </Box>
  );
};

export { DoneTaskPage };
