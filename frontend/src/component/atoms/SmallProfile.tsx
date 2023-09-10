import { Card, Flex, Box, Heading, Text, Image } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  img: string[];
  name: string[];
  position: string[];
};

const smallProfile = ({ isOpen, img, name, position }: Props) => {
  return (
    <>
      {img.map((url, index) => (
        <Card
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
              <Image
                ml="2"
                borderRadius="full"
                boxSize="40px"
                src={url}
                alt={name[index]}
              />
              {isOpen ? (
                <Box>
                  <Heading size="sm">{name[index]}</Heading>
                  <Text>{position[index]}</Text>
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

export default smallProfile;
