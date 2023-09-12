import { FolderList } from "../component/FolderList";
import { Logout } from "./Logout";

//FolderList.tsxとTaskListSpace.tsxで同じフォルダーの情報をuseContextで共有する
import { FolderContextProvider } from "../FolderContext";
import { TaskListSpace } from "../component/TaskListSpace";
import { Flex } from "@chakra-ui/react";

const FresherTop = () => {
  return (
    <FolderContextProvider>
      <Flex h="100vh" bg="blue.100">
        <FolderList />
        <TaskListSpace />
      </Flex>
      <Logout />
    </FolderContextProvider>
  );
};

export { FresherTop };
