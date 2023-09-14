import LeftPlacement from "../component/FreshersListBar";
import { FresherProfile } from "../component/fresher_profile/FresherProfile";
import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FolderContextProvider } from "../FolderContext";
import { FolderList } from "../component/FolderList";
import FreshersListBar from "../component/FreshersListBar";

const ElderTop = () => {
  return (
    <HStack>
      <Box>
        <FreshersListBar />
      </Box>
      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box w="auto" marginTop={8} paddingY={2}>
          <FresherProfile />
        </Box>
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
    </HStack>
  );
};

export { ElderTop };
