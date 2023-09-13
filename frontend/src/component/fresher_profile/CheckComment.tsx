import React, { useEffect, useState } from "react";
import Commenter from "../atoms/Commenter";

import { Box, Text } from "@chakra-ui/react";

type CommenterType = {
  name: string;
  position: string;
  comment: string;
};

type taskData = {
  taskNanme: string;
  taskContent: string;
  memo: string;
  commenter: CommenterType;
  reactions: number[];
};

function CheckComment() {
  const [taskDatas, setTaskDatas] = useState<taskData>({
    taskNanme: "",
    taskContent: "",
    memo: "",
    commenter: {
      name: "",
      position: "",
      comment: "",
    },
    reactions: [],
  });

  //useEffectかなんかで、「task_id」「token」から詳細情報を得する（タスクIDをもとにAPIをたたく）
  useEffect(() => {
    const taskInfo = {
      taskNanme: "タスクの名前",
      taskContent: "タスク内容",
      memo: "メモ内容",
      commenter: {
        name: "三三上司",
        position: "ポジション",
        comment: "いいですね！",
      },
      reactions: [0, 1],
    };
    setTaskDatas(taskInfo);
  }, []);

  return (
    <Box maxW="5xl" mx="auto" textAlign="center">
      <Text fontSize="3xl" mt="8" align={"center"} justifyContent={"center"}>
        {taskDatas.taskNanme}
      </Text>
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        タスク内容
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {taskDatas.taskContent}
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
        <Text color="gray.500"> {taskDatas.memo}</Text>
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
        {/* 取得したJsonをもとに、mapでcommenterのデータを呼び出す */}
        <Commenter
          name={taskDatas.commenter.name}
          potision={taskDatas.commenter.position}
          content={taskDatas.commenter.comment}
        />

        {/* mainをpull後 ここにスタンプ表示機能追加する */}
      </Box>
    </Box>
  );
}

export default CheckComment;
