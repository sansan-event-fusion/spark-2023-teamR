import React, { useContext, useEffect, useState } from "react";
import Commenter from "../component/atoms/Commenter";

import { Box, HStack, Text } from "@chakra-ui/react";
import { Comments, Task, Emotions } from "../type/Types";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { iconList } from "../component/likes_comments/FaceIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DoneTaskPage = ({ task }: { task: Task }) => {
  const [comments, setComments] = useState<Comments>([]);
  const [emotions, setEmotions] = useState<Emotions>([]);

  const { auth } = useAuth();

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
      console.log("comment GET:", responseData);
      setComments(responseData);
    } else {
      console.log("comment GET 失敗");
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
      console.log("emotion GET:", responseData);
      setEmotions(responseData);
    } else {
      console.log("comment GET 失敗");
    }
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      console.log("auth.token:", auth.token);
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
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        padding={"2"}
        textAlign={"left"}
      >
        {/* <Text color="gray.500"> {task.memo}</Text> */}
      </Box>
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
            user_name={comment.user_name}
            position={comment.position}
            content={comment.content}
            id={0}
          />
        ))}
        <HStack>
          {emotions.map((emotion) => (
            <Box>
              {iconList.map((icon) => (
                <Box>
                  {emotion.id === icon.id && (
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
      </Box>
    </Box>
  );
};

export { DoneTaskPage };
