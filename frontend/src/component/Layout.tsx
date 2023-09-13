import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      overflow={"hidden"}
    >
      <Header />
      <Box>{children}</Box>
    </Box>
  );
};

export { Layout };
