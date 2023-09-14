import {
  Box,
  Card,
  Image,
  Text,
  StackDivider,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { defaultIcon } from "../../style/defaultIcon";
import { Fresher, User } from "../../type/Types";

const FresherProfile = ({ person }: { person: User | Fresher | null }) => {
  return (
    <Card padding="6" minW={"400px"} minH={"100px"}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <HStack
          spacing={4}
          align="stretch"
          divider={<StackDivider borderColor="gray.200" />}
        >
          {/* //personがnullでなければ、返す */}
          {person ? (
            <>
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
                    <Text fontSize="2xl">{person.username}</Text>
                  </Box>
                </VStack>
              </HStack>

              <VStack>
                <HStack>
                  <Box w={"80px"}>
                    <Text align="right">いいね数</Text>
                  </Box>
                  <Text fontSize={"2xl"} ml={"8"} align="right">
                    {person.count_emotions}
                  </Text>
                </HStack>
                <HStack>
                  <Box w={"80px"}>
                    <Text align="right">コメント数</Text>
                  </Box>
                  <Text fontSize={"2xl"} ml={"8"}>
                    {person.count_comment}
                  </Text>
                </HStack>
              </VStack>
            </>
          ) : (
            <p>新卒のプロフィール</p>
          )}
        </HStack>
      </Box>
    </Card>
  );
};

export { FresherProfile };
