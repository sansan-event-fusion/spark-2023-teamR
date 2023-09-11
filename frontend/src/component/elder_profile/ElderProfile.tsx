import React from "react";
import {
  Box,
  Card,
  Image,
  Text,
  Divider,
  CardFooter,
  VStack,
  HStack,
} from "@chakra-ui/react";

type ElderData = {
  img: string;
  name: string;
  count_like: number;
  count_comment: number;
};

function ElderProfile({ img, name, count_like, count_comment }: ElderData) {
  return (
    <Box position="absolute" top="10px" right="10px">
      <Card padding="6">
        <VStack>
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
          <Divider borderColor="gray.400" mt="6" />
          <CardFooter>
            <VStack>
              <HStack>
                <Text>いいねした数</Text>
                <Text fontSize={"2xl"} ml={"8"}>
                  33
                </Text>
              </HStack>
              <HStack>
                <Text>コメントした数</Text>
                <Text fontSize={"2xl"} ml={"8"}>
                  3
                </Text>
              </HStack>
            </VStack>
          </CardFooter>
        </VStack>
      </Card>
    </Box>
  );
}

export default ElderProfile;
