import { FolderList } from "../component/FolderList";
import { Logout } from "./Logout";

import { FolderContextProvider } from "../FolderContext";
import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FresherProfile } from "../component/fresher_profile/FresherProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";

const FresherTop = () => {
  return (
    <>
      <VStack w={"100%"} h={"100%"}>
        <HStack marginTop={8}>
          <FontAwesomeIcon icon={faPersonRunning} size="3x" />
          <Box w="auto" paddingY={2} paddingX={6}>
            <FresherProfile />
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
            <FolderList />
            <TaskList />
          </FolderContextProvider>
        </Flex>
      </VStack>
      <Logout />
    </>
  );
};

export { FresherTop };
