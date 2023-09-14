import { FresherProfile } from "../component/fresher_profile/FresherProfile";
import { TaskList } from "../component/TaskList";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { FolderContextProvider } from "../FolderContext";
import { FolderList } from "../component/FolderList";
import FreshersListBar from "../component/FreshersListBar";
import { useContext } from "react";
import { FresherContext } from "../FresherContext";

const ElderTop = () => {
  const { fresher } = useContext(FresherContext);
  return (
    <HStack>
      <Box>
        <FreshersListBar />
      </Box>
      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box w="auto" marginTop={8} paddingY={2}>
          {/* //fresher idが1ならばfresherを渡し、それ以外ならばnullを渡す */}
          {fresher.position_id === 1 ? (
            <FresherProfile person={fresher} />
          ) : (
            <FresherProfile person={null} />
          )}
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
