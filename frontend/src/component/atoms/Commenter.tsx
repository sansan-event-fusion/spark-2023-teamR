import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";
import { Comment } from "../../type/Types";

const Commenter = ({ user_name, position, content }: Comment) => {
  return (
    <Box marginX="4" marginY="2">
      <HStack spacing={"2"}>
        <Text fontSize="xl">{user_name}</Text>
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
