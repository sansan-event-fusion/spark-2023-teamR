import { FolderList } from "../component/FolderList";
import { Logout } from "./Logout";

import { FolderContextProvider } from "../FolderContext";
import { TaskList } from "../component/TaskList";
import { Flex } from "@chakra-ui/react";

const FresherTop = () => {
  return (
    <>
      <Flex h="100%" w="100%">
        <FolderContextProvider>
          <FolderList />
          <TaskList />
        </FolderContextProvider>
      </Flex>
      <Logout />
    </>
  );
};

export { FresherTop };
