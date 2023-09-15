import { Box, Text, Textarea } from "@chakra-ui/react";
import { Task } from "../type/Types";
import { DoneButton } from "../component/atoms/DoneButton";
import { DoButton } from "../component/atoms/DoButton";
import { useAuth } from "../AuthContext";
import { useState } from "react";

const NotDoneTaskPage = ({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const [value, setValue] = useState("");

  const handleInputChange = (e: { target: { value: any } }) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setValue(inputValue);
  };
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
      <Text color="gray.500" mb="1" mt="2" textAlign={"left"}>
        過去のメモ
      </Text>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" padding={"2"}>
        <Text color="gray.500" textAlign={"left"}>
          {task.memo}
        </Text>
      </Box>
      <>
        <Text color="gray.500" mb="1" mt="4" textAlign={"left"}>
          メモ
        </Text>
        <Textarea
          height="30vh"
          value={value}
          onChange={handleInputChange}
          placeholder="Here is a sample placeholder"
          size="sm"
          resize="none"
        />
      </>

      {user.position_id === 1 ? (
        task.status === "doing" ? (
          <DoneButton taskId={task.id} onClose={onClose} memo={value} />
        ) : (
          <DoButton taskId={task.id} onClose={onClose} memo={value} />
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
