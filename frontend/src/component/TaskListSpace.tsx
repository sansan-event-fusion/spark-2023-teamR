//1つのフォルダーの中のタスク一覧を表示するコンポーネント
import { Flex, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FolderContext } from "../FolderContext";

const TaskListSpace = () => {
  const { folders, activeFolderId } = useContext(FolderContext);
  return (
    <Flex>
      {folders.map((folder) => (
        <VStack key={folder.id}>
          {activeFolderId === folder.id && (
            <>
              <p>{folder.vision}</p>
              {folder.tasks.map((task) => (
                <p key={task.id}>{task.title}</p>
              ))}
            </>
          )}
        </VStack>
      ))}
    </Flex>
  );
};

export { TaskListSpace };
