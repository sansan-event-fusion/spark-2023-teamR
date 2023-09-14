import { Card, Flex, Box, Heading } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  freshers: any;
};

const FreshersListBarContents = ({ isOpen, freshers }: Props) => {
  return (
    <>
      {freshers.length === 0 ? (
        <Box paddingTop={4} textAlign={"center"}>
          <p>新卒がいません</p>
        </Box>
      ) : (
        <></>
      )}

      {freshers.map((fresher: any) => (
        <Card
          key={fresher.id} // 必要に応じて一意のキーを設定
          maxW="md"
          mt="2"
          ml="2"
          mr="2"
          bg="white"
          boxShadow="none"
          _hover={{
            bg: "gray.200",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          <Flex>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              {isOpen ? (
                <Box>
                  <Heading size="sm">{fresher.name}</Heading>
                </Box>
              ) : (
                <></>
              )}
            </Flex>
          </Flex>
        </Card>
      ))}
    </>
  );
};

export default FreshersListBarContents;
