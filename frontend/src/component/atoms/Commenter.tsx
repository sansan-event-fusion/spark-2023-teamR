import { Box, Text, HStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  name: string;
  potision: string;
  content: string;
};

function Commenter({ name, potision, content }: Props) {
  return (
    <Box marginX="4" marginY="2">
      <HStack spacing={"2"}>
        <Text fontSize="xl">{name}</Text>
        <Text fontSize="md" textColor="gray.400">
          {potision}
        </Text>
      </HStack>
      <Box padding={"2"} marginX="4">
        {content}
      </Box>
    </Box>
  );
}

export default Commenter;
