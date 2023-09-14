import { FolderList } from "../component/FolderList";
import { Logout } from "./Logout";

import { FolderContextProvider } from "../FolderContext";
import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FresherProfile } from "../component/fresher_profile/FresherProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { TaskContextProvider } from "../TaskContext";
import { useAuth } from "../AuthContext";

const FresherTop = () => {
  const { user } = useAuth();
  return (
    <>
      <VStack w={"100%"} h={"100%"}>
        <HStack marginTop={8}>
          <FontAwesomeIcon icon={faPersonRunning} size="3x" />
          <Box w="auto" paddingY={2} paddingX={6}>
            {/* //user position idが1ならばfresherを渡し、それ以外ならばnullを渡す */}
            {user.position_id === 1 ? (
              <FresherProfile person={user} />
            ) : (
              <FresherProfile person={null} />
            )}
          </Box>
          <FontAwesomeIcon icon={faChildReaching} size="3x" />
        </HStack>
        <Flex
          w={"80%"}
          h={"100%"}
          marginTop={8}
          border={"1px solid"}
          borderColor={"gray.200"}
          rounded={"md"}
        >
          <FolderContextProvider>
            <TaskContextProvider>
              <FolderList />
              <TaskList />
            </TaskContextProvider>
          </FolderContextProvider>
        </Flex>
      </VStack>
      <Logout />
    </>
  );
};

export { FresherTop };
