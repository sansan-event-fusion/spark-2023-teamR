import { Box, Text } from "@chakra-ui/react";
import { Task } from "../type/Types";
import { DoneButton } from "../component/atoms/DoneButton";
import { DoButton } from "../component/atoms/DoButton";
import { useAuth } from "../AuthContext";

const NotDoneTaskPage = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const { user } = useAuth();
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
        marginBottom={4}
        textAlign={"left"}
      >
        {/* <Text color="gray.500"> {taskDatas.memo}</Text> */}
      </Box>
      {user.position_id === 1 ? (
        task.status === "doing" ? (
          <DoneButton taskId={task.id} onClose={onClose} />
        ) : (
          <DoButton taskId={task.id} onClose={onClose} />
        )
      ) : (
        <div>
          {task.status === "doing" ? (
            <Text color={"orange"}>取り組み中</Text>
          ) : task.status === "done" ? (
            <Text color={"blue.400"}>完了</Text>
          ) : (
            <Text color={"gray.500"}>未着手</Text>
          )}
        </div>
      )}
    </Box>
  );
};

export { NotDoneTaskPage };
