import React, { useEffect, useState } from "react";
import Commenter from "../component/atoms/Commenter";

import { Box, Text } from "@chakra-ui/react";
import { Comments, Task, Emotion } from "../type/Types";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { FaceIcons } from "../component/likes_comments/FaceIcons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmileWink,
  faFaceSurprise,
  faFaceKissWinkHeart,
  faFaceGrinSquintTears,
  faFaceGrinBeamSweat,
  faFaceGrimace,
  faFaceDizzy,
  faFaceGrinHearts,
  faFaceGrinTongueSquint,
  faFaceMehBlank,
} from "@fortawesome/free-solid-svg-icons";

const DoneTaskPage = ({ task }: { task: Task }) => {
  const [comments, setComments] = useState<Comments>([]);
  const [emotions, setEmotions] = useState<Comments>([]);

  const { auth } = useAuth();

  const iconList = {
    smile: {
      id: 1,
      icon: faFaceSmileWink,
      color: "#fbd92e",
      size: "2xl",
      animation: "fa-bounce",
    },
    suprise: {
      id: 2,
      icon: faFaceSurprise,
      color: "#f503f6",
      size: "2xl",
      animation: "fa-spin",
    },
    kiss: {
      id: 3,
      icon: faFaceKissWinkHeart,
      color: "#fe3d7f",
      size: "2xl",
      animation: "fa-beat",
    },
    squint: {
      id: 4,
      icon: faFaceGrinSquintTears,
      color: "#26a3ef",
      size: "2xl",
      animation: "fa-pulse",
    },
    beam: {
      id: 5,
      icon: faFaceGrinBeamSweat,
      color: "#7bb241",
      size: "2xl",
      animation: "fa-bounce",
    },
    grimace: {
      id: 6,
      icon: faFaceGrimace,
      color: "#f1a900",
      size: "2xl",
      animation: "fa-bounce",
    },
    dizzy: {
      id: 7,
      icon: faFaceDizzy,
      color: "#9f9f9f",
      size: "2xl",
      animation: "fa-spin",
    },
    hearts: {
      id: 8,
      icon: faFaceGrinHearts,
      color: "#ea3f79",
      size: "2xl",
      animation: "fa-beat",
    },
    tongue: {
      id: 9,
      icon: faFaceGrinTongueSquint,
      color: "#5d17f6",
      size: "2xl",
      animation: "fa-pulse",
    },
    blank: {
      id: 10,
      icon: faFaceMehBlank,
      color: "#ad2c27",
      size: "2xl",
      animation: "fa-bounce",
    },
  };

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
  }, [auth.token, task.id]);

  return (
    <Box maxW="5xl" mx="auto" textAlign="center">
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
        {/* <Text color="gray.500"> {taskDatas.memo}</Text> */}
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
        {/* mainをpull後 ここにスタンプ表示機能追加する */}
        {emotions.map((emotion) => (
          <>aaa</>
        ))}
      </Box>
    </Box>
  );
};

export { DoneTaskPage };
