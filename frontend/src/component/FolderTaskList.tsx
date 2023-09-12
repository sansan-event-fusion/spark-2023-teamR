import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import TaskList from "./TaskList";
import { CreateFolderButton } from "./atoms/CreateFolderButton";

function FolderTaskList() {
  const [buttonBeforeIndex, setButtonBeforeIndex] = useState<number>(0);
  const [buttonStates, setButtonStates] = useState([
    { folderName: "ボタン1", vision: "ボタン1のビジョン", active: true },
    { folderName: "ボタン2", vision: "ボタン2のビジョン", active: false },
    { folderName: "ボタン3", vision: "ボタン3のビジョン", active: false },
  ]);

  const handleFolderButtonClick = (index: number) => {
    const updatedButtonStates = [...buttonStates];
    updatedButtonStates[buttonBeforeIndex].active = false;
    updatedButtonStates[index].active = true;

    setButtonStates(updatedButtonStates);
    setButtonBeforeIndex(index);
  };

  return (
    <Flex h="100vh" bg="blue.100">
      <Flex direction="column" bg="white" w="120px">
        {buttonStates.map((button, index) => (
          <Button
            rounded="none"
            key={button.folderName}
            onClick={() => handleFolderButtonClick(index)}
            bg={button.active ? "blue.100" : "white"}
            size="lg"
          >
            {button.folderName}
          </Button>
        ))}

        <CreateFolderButton
          buttonStates={buttonStates}
          setButtonStates={setButtonStates}
        />
      </Flex>

      <TaskList buttonStates={buttonStates} />
    </Flex>
  );
}

export default FolderTaskList;
