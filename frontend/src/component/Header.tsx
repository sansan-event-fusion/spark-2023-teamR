import { Box } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      w="100%"
      h="32px"
      bg="white"
      color="blue.400"
      fontWeight="bold"
      shadow={"0px 2px 4px rgba(0, 0, 0, 0.25)"}
      display="flex"
      alignItems="center"
      paddingX={6}
      zIndex={2}
    >
      <h1>RRR</h1>
    </Box>
  );
};

export { Header };
