import LeftPlacement from "../component/LeftPlacement";
import { FresherProfile } from "../component/fresher_profile/FresherProfile";
import { TaskList } from "../component/TaskList";
import { Box, Center, HStack, VStack } from "@chakra-ui/react";

const ElderTop = () => {
  return (
    <HStack>
      <LeftPlacement />

      <VStack w={"100%"} h={"100%"} marginLeft={"80px"}>
        <Box bg={"black"} w="auto" p={2}>
          <FresherProfile />
        </Box>
        <Box w="80%" h="80vh">
          <TaskList />
        </Box>
      </VStack>
    </HStack>
  );
};

export { ElderTop };
