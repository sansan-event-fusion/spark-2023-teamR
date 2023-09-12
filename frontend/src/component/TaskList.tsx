import { Flex, Box, Text, VStack, StackDivider } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";

type ButtonStates = {
  folderName: string;
  vision: string;
  active: boolean;
};

type Props = {
  buttonStates: ButtonStates[];
};

function TaskList({ buttonStates }: Props) {
  return (
    <Flex w="100%" mt="8" justify="center">
      <Box w="80%">
        <center>
          <Text as="b" fontSize="3xl">
            得られる力 : {buttonStates.find((button) => button.active)?.vision}
            <br />
          </Text>
        </center>

        <VStack
          divider={<StackDivider borderColor="gray.300" />}
          spacing={4}
          mt="4"
          align="stretch"
        >
          {/* 完了したタスク */}
          <Box
            rounded="lg"
            border="1px solid"
            p={4}
            borderColor="gray.300"
            bg="blue.300"
          >
            <Flex justifyContent="space-between">
              <FontAwesomeIcon
                size="xl"
                icon={faCircleCheck}
                style={{ color: "#1275ae" }}
              />
              <Text>タスク</Text>
              <FontAwesomeIcon
                size="xl"
                icon={faCircleCheck}
                style={{ color: "#63B3ED" }}
              />
            </Flex>
          </Box>
          {/* 実行中のタスク */}
          <Box
            rounded="lg"
            border="1px solid"
            p={4}
            borderColor="gray.300"
            bg="yellow.200"
          >
            <Flex justifyContent={"space-between"}>
              <FontAwesomeIcon
                icon={faPersonRunning}
                size="xl"
                style={{ color: "#b19218" }}
                shake
              />
              <Text>タスク</Text>
              <FontAwesomeIcon
                size="xl"
                icon={faCircleCheck}
                style={{ color: "#EDDEA4" }}
              />
            </Flex>
          </Box>
          {/* 実行予定のタスク */}
          <Box rounded="lg" border="1px solid" p={4} borderColor="gray.300">
            <Flex justifyContent={"space-between"}>
              <FontAwesomeIcon
                size="xl"
                icon={faCircleCheck}
                style={{ color: "#d9d9d9" }}
              />
              <Text color="gray.400">タスク</Text>
              <FontAwesomeIcon
                size="xl"
                icon={faCircleCheck}
                style={{ color: "#E2EAF4" }}
              />
            </Flex>
          </Box>
        </VStack>
      </Box>
    </Flex>
  );
}

export default TaskList;
