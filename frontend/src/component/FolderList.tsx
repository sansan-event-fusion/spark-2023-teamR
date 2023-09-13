import { useContext } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { CreateFolderButton } from "./atoms/CreateFolderButton";
import { Folder, Folders } from "../type/Types";
import { FolderContext } from "../FolderContext";

type Props = {
  activeFolderId: number | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const FolderList = () => {
  const { activeFolderId, setActiveFolderId, folders, setFolders }: Props =
    useContext(FolderContext);

  const handleFolderClick = (folder: Folder) => {
    console.log(folder);
    setActiveFolderId(folder.id);
  };

  return (
    <Flex direction="column" bg="white" w={120} roundedLeft={"md"}>
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
  );
};

export { FolderList };
