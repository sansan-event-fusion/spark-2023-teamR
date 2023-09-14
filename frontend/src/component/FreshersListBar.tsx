import { useContext, useState } from "react";
import FreshersListBarContents from "./atoms/FreshersListBarContents";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FresherContext } from "../FresherContext";

const FreshersListBar = () => {
  const { freshers } = useContext(FresherContext);
  console.log("freshers:", freshers);

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
          <Button onClick={toggleSidebar} mt="2" bg="white">
            <ChevronRightIcon />
          </Button>
        </Flex>

        <FreshersListBarContents isOpen={isOpen} freshers={freshers} />
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
              <Box ml="auto">新卒</Box>
              <Button ml="auto" onClick={toggleSidebar} mt="2" bg="white">
                <ChevronLeftIcon />
              </Button>
            </Flex>

            <FreshersListBarContents isOpen={isOpen} freshers={freshers} />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FreshersListBar;
