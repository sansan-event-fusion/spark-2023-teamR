import React from "react";
import {
  Box,
  Card,
  Image,
  Text,
  StackDivider,
  VStack,
  HStack,
} from "@chakra-ui/react";

type FresherData = {
  img: string;
  name: string;
  count_complete_task: number;
  count_complete_folder: number;
  count_like: number;
  count_comment: number;
};

const FresherProfile = () => {
  return (
    // <Box>
    <Card padding="6">
      <HStack
        spacing={4}
        align="stretch"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack>
          <Image
            borderRadius="full"
            boxSize="60px"
            src={"https://bit.ly/dan-abramov"}
            alt="三三 次郎"
          />
          <VStack>
            <Box ml="20px">
              <Text fontSize="2xl">三三 次郎</Text>
              <Text textAlign="left">営業</Text>
            </Box>
          </VStack>
        </HStack>

        <VStack>
          <HStack>
            <Text>完了タスク数</Text>
            <Text fontSize={"2xl"} ml={"8"}>
              33
            </Text>
          </HStack>
          <HStack>
            <Text>完了フォルダ数</Text>
            <Text fontSize={"2xl"} ml={"8"}>
              3
            </Text>
          </HStack>
        </VStack>
        <VStack>
          <HStack>
            <Text>いいね数</Text>
            <Text fontSize={"2xl"} ml={"8"}>
              33
            </Text>
          </HStack>
          <HStack>
            <Text>コメント数</Text>
            <Text fontSize={"2xl"} ml={"8"}>
              3
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
    // </Box>
  );
};

export { FresherProfile };
