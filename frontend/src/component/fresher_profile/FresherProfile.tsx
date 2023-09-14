import React, { useContext, useState } from "react";
import {
  Box,
  Card,
  Image,
  Text,
  StackDivider,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../../AuthContext";
import { defaultIcon } from "../../style/defaultIcon";
import { FresherContext } from "../../FresherContext";

type FresherData = {
  img: string;
  name: string;
  count_complete_task: number;
  count_complete_folder: number;
  count_like: number;
  count_comment: number;
};

const FresherProfile = () => {
  const { fresher } = useContext(FresherContext);
  return (
    <Card padding="6">
      <HStack
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack>
          <Image
            marginLeft={4}
            borderRadius="full"
            boxSize="60px"
            src={defaultIcon}
            alt="default icon"
          />
          <VStack>
            <Box ml="20px" paddingX={6} margin={0}>
              <Text fontSize="2xl">{fresher.username}</Text>
            </Box>
          </VStack>
        </HStack>

        <VStack>
          <HStack>
            <Box w={"80px"}>
              <Text align="right">いいね数</Text>
            </Box>
            <Text fontSize={"2xl"} ml={"8"} align="right">
              {fresher.count_emotions}
            </Text>
          </HStack>
          <HStack>
            <Box w={"80px"}>
              <Text align="right">コメント数</Text>
            </Box>
            <Text fontSize={"2xl"} ml={"8"}>
              {fresher.count_comment}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};

export { FresherProfile };
