import { Box, Text, HStack } from "@chakra-ui/react";
import { Comment } from "../../type/Types";

const Commenter = ({ sender_username, position, content }: Comment) => {
  return (
    <Box marginX="4" marginY="2">
      <HStack spacing={"2"}>
        <Text fontSize="xl" as="b">
          {sender_username}
        </Text>
        <Text fontSize="md" textColor="gray.400">
          {position}
        </Text>
      </HStack>
      <Box padding={"2"} marginX="4">
        {content}
      </Box>
    </Box>
  );
};

export default Commenter;
