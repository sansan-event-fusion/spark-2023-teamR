import { Button } from "@chakra-ui/react";

const handleTaskDone = () => {
  // タスクの状態を変更するPOST
  console.log("タスクの状態変更(取り組み中に変更)");
};

const DoButton = () => {
  return (
    <Button
      onClick={handleTaskDone}
      bg={"yellow.500"}
      textColor={"white"}
      _hover={{ opacity: 0.8 }}
    >
      取り組む
    </Button>
  );
};

export { DoButton };
