//1つのフォルダーの中のタスク一覧を表示するコンポーネント
import { Flex, VStack, Text, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { FolderContext } from "../FolderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";

const TaskList = () => {
  const { folders, activeFolderId } = useContext(FolderContext);
  return (
    <Box bg="blue.100" w="100%" h="100%" paddingY={6}>
      {folders.map((folder) => (
        <Box>
          {activeFolderId === folder.id && (
            <Box textAlign={"center"}>
              <Text fontSize="3xl" p={4}>
                {folder.vision}
              </Text>
              <VStack justifyContent="center" p={4}>
                {folder.tasks.length === 0 && (
                  <Text fontSize="2xl">タスクを追加＋</Text>
                )}
                {folder.tasks.map((task) => (
                  <Box
                    key={task.id}
                    rounded="lg"
                    border="1px solid gray.300"
                    w={"70%"}
                    paddingX={6}
                    paddingY={4}
                    m={2}
                    bg={
                      task.status === "todo"
                        ? "white"
                        : task.status === "doing"
                        ? "yellow.200"
                        : "blue.400"
                    }
                  >
                    <Flex justifyContent={"space-between"}>
                      <FontAwesomeIcon
                        size="lg"
                        icon={
                          task.status === "doing"
                            ? faPersonRunning
                            : faCircleCheck
                        }
                        style={{
                          color:
                            task.status === "doing"
                              ? "#F7A072"
                              : task.status === "todo"
                              ? "#CBD5E0"
                              : "#1275AE",
                        }}
                      />
                      <Text key={task.id} marginRight={6}>
                        {task.title}
                      </Text>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export { TaskList };
