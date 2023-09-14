import { Flex, VStack, Text, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FolderContext } from "../FolderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { CreateTaskButton } from "./atoms/CreateTaskButton";
import { useAuth } from "../AuthContext";
import { accessPointURL } from "../api/accessPoint";
import { Task, Tasks } from "../type/Types";
import { DoneTaskPage } from "../pages/DoneTaskPage";
import { NotDoneTaskPage } from "../pages/NotDoneTaskPage";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const { folders, setFolders, activeFolderId } = useContext(FolderContext);
  const { user, auth } = useAuth();
  const [tasks, setTasks] = useState<Tasks>([]);

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

  const handleTaskClick = (task: Task) => {
    return task.status === "done" ? (
      // <DoneTaskPage task={task} />
      navigate("/doneTaskPage")
    ) : (
      <NotDoneTaskPage task={task} />
    );
  };

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
                    onClick={() => handleTaskClick(task)}
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
                        shake={task.status === "doing"}
                      />
                      <Text key={task.id} marginRight={6}>
                        {task.title}
                      </Text>
                    </Flex>
                  </Box>
                ))}

                {user.position_id !== 1 && (
                  <CreateTaskButton
                    folder={folder}
                    folders={folders}
                    setFolders={setFolders}
                  />
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
