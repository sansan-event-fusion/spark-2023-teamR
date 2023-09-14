import { useContext, useState } from "react";
import FreshersListBarContents from "./atoms/FreshersListBarContents";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FresherContext } from "../fresherContext";
const FreshersListBar = () => {
  // const { freshers } = useContext(FresherContext);
  // console.log("freshers->:", freshers);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box
        pos="fixed"
        left={isOpen ? "0" : "0px"}
        top="0"
        h="100vh"
        w="80px"
        bg="white"
        borderRight="1px solid #ccc"
        transition="left 0.3s ease"
      >
        <Flex justifyContent="center">
          <VStack>
            <Box paddingTop={2}>
              <p>新卒</p>
              <p>一覧</p>
            </Box>
            <Button onClick={toggleSidebar} bg="white" size={"lg"}>
              <ChevronRightIcon />
            </Button>{" "}
          </VStack>
        </Flex>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={toggleSidebar}
        size="xs"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box
            pos="fixed"
            left={isOpen ? "0" : "-300px"}
            top="0"
            h="100vh"
            w="20rem"
            bg="white"
            borderRight="1px solid #ccc"
            transition="left 0.3s ease"
          >
            <Flex justify="center" align="center">
              <Box ml="auto" fontSize={"2xl"} paddingY={4}>
                新卒一覧
              </Box>
              <Button ml="auto" onClick={toggleSidebar} mt="2" bg="white">
                <ChevronLeftIcon />
              </Button>
            </Flex>

            <FreshersListBarContents isOpen={isOpen} />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FreshersListBar;
