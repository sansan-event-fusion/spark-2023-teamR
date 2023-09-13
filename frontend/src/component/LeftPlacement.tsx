import { useState } from "react";
import SmallProfile from "./atoms/SmallProfile";
import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const LeftPlacement = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 仮データ
  const freshers = {
    img: [
      "https://bit.ly/dan-abramov",
      "https://bit.ly/code-beast",
      "https://bit.ly/kent-c-dodds",
      "https://bit.ly/ryan-florence",
    ],
    name: ["wakki-", "riko", "ryo", "hassu-"],
    position: ["エンジニア", "事務", "営業", "水汲み"],
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Box
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

        <SmallProfile
          isOpen={isOpen}
          img={freshers.img}
          name={freshers.name}
          position={freshers.position}
        />
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

            <SmallProfile
              isOpen={isOpen}
              img={freshers.img}
              name={freshers.name}
              position={freshers.position}
            />
          </Box>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LeftPlacement;
