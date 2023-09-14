import { Card, Flex, Box, Heading } from "@chakra-ui/react";
import { Fresher } from "../../type/Types";
import { FresherContext } from "../../FresherContext";
import { useContext } from "react";

type Props = {
  isOpen: boolean;
};

const FreshersListBarContents = ({ isOpen }: Props) => {
  const { setFresher } = useContext(FresherContext);

  const handleClick = (fresher: Fresher) => {
    setFresher(fresher);
  };

  const { freshers } = useContext(FresherContext);
  return (
    <>
      {freshers.length === 0 && (
        <Box>
          <p>新卒がいません</p>
        </Box>
      )}
      {freshers.map((fresher: Fresher) => (
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
                <Box
                  w="100%"
                  h="36px"
                  display="flex"
                  alignItems="center"
                  paddingX={8}
                  border={"0.5px solid"}
                  borderColor={"gray.200"}
                  onClick={() => handleClick(fresher)}
                >
                  <Heading size="sm">{fresher.username}</Heading>
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
