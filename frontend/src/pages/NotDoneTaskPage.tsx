import { Box, Text } from "@chakra-ui/react";
import { Task } from "../type/Types";
import { DoneButton } from "../component/atoms/DoneButton";
import { DoButton } from "../component/atoms/DoButton";

const NotDoneTaskPage = ({ task }: { task: Task }) => {
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
      {task.status === "doing" ? (
        <DoneButton taskId={task.id} />
      ) : (
        <DoButton taskId={task.id} />
      )}
    </Box>
  );
};

export { NotDoneTaskPage };
