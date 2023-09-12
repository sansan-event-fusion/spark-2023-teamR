import { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { CreateFolderButton } from "./atoms/CreateFolderButton";
import { Folder, Folders } from "../type/Types";

const FolderList = () => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null);
  const [folders, setFolders] = useState<Folders>([
    {
      id: 1,
      title: "フォルダ1",
      vision: "ビジョン1",
      tasks: [],
    },
  ]);

  const handleFolderClick = (folder: Folder) => {
    console.log(folder);
    setActiveFolderId(folder.id);
  };

  return (
    <Flex h="100vh" bg="blue.100">
      <Flex direction="column" bg="white" w="120px">
        {/* フォルダー一覧を表示 */}
        {folders.map((folder) => (
          <Button
            rounded="none"
            key={folder.title}
            onClick={() => handleFolderClick(folder)}
            bg={activeFolderId === folder.id ? "blue.100" : "white"}
            size="lg"
          >
            {folder.title}
          </Button>
        ))}

        {/* フォルダー作成ボタン */}
        <CreateFolderButton
          folders={folders}
          setFolders={setFolders}
          setActiveFolderId={setActiveFolderId}
        />
      </Flex>
    </Flex>
  );
};

export { FolderList };
