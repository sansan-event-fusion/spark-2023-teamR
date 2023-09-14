import {
  Flex,
  VStack,
  Text,
  Box,
  Modal,
  useDisclosure,
  ModalBody,
  ModalContent,
  Button,
  ModalOverlay,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { FolderContext } from "../FolderContext";
import { TaskContext } from "../TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { CreateTaskButton } from "./atoms/CreateTaskButton";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { DoneTaskPage } from "../pages/DoneTaskPage";
import { NotDoneTaskPage } from "../pages/NotDoneTaskPage";

const TaskList = () => {
  const { folders, activeFolderId } = useContext(FolderContext);
  const { user, auth } = useAuth();
  const { tasks, setTasks } = useContext(TaskContext);

  const getFolderIdTasks = async (token: string, folderId: number) => {
    const response = await fetch(
      `${accessPointURL}task/?folder_id=${folderId}`,
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
      console.log("TASK GET:", responseData);
      setTasks(responseData);
    } else {
      console.log("GET失敗");
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (auth.token !== undefined && activeFolderId !== null) {
      console.log("auth.token:", auth.token);
      getFolderIdTasks(auth.token, activeFolderId!);
    } else {
      console.log("auth.tokenがundefinedです");
    }
  }, [auth.token, activeFolderId]);
  return (
    <Box bg="blue.100" w="100%" minH={"70vh"} paddingY={6} roundedRight={"md"}>
      {folders.map((folder) => (
        <Box>
          {activeFolderId === folder.id && (
            <Box textAlign={"center"}>
              <Text fontSize="3xl" p={4}>
                {folder.vision}
              </Text>
              <VStack justifyContent="center" p={4}>
                {tasks.length === 0 && (
                  <Box>
                    <Text fontSize="2xl">タスクがありません</Text>
                  </Box>
                )}
                {tasks.map((task) => (
                  <Box
                    as="button"
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
                    _hover={
                      task.status === "todo"
                        ? { bg: "gray.300" }
                        : { opacity: 0.8 }
                    }
                    onClick={onOpen}
                  >
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent padding={4}>
                        <ModalBody>
                          {task.status === "done" ? (
                            <DoneTaskPage task={task} />
                          ) : (
                            <NotDoneTaskPage task={task} />
                          )}
                        </ModalBody>

                        <VStack
                          marginTop={4}
                          justifyContent={"center"}
                          alignItems={"center"}
                          textAlign={"center"}
                        >
                          {task.status === "doing" ? (
                            <Text fontSize="3xl" as="b" color={"orange"}>
                              取り組み中
                            </Text>
                          ) : task.status === "done" ? (
                            <Text fontSize="3xl" as="b" color={"blue.400"}>
                              Done !
                            </Text>
                          ) : (
                            <></>
                          )}
                          <Button
                            colorScheme="gray"
                            m={4}
                            w="100px"
                            onClick={onClose}
                          >
                            とじる
                          </Button>
                        </VStack>
                      </ModalContent>
                    </Modal>
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
                        shake={task.status === "doing"}
                      />
                      <Text key={task.id} marginRight={6}>
                        {task.title}
                      </Text>
                    </Flex>
                  </Box>
                ))}

                {user.position_id !== 1 && (
                  <CreateTaskButton activeFolderId={activeFolderId} />
                )}
              </VStack>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export { TaskList };
