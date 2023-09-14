import { Box, Text } from "@chakra-ui/react";
import { Task } from "../type/Types";

const NotDoneTaskPage = ({ task }: { task: Task }) => {
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
    </Box>
  );
};

export { NotDoneTaskPage };
