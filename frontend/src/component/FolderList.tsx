import { useContext } from "react";
import { Flex, Button, Box } from "@chakra-ui/react";
import { CreateFolderButton } from "./atoms/CreateFolderButton";
import { Folder, Folders } from "../type/Types";
import { FolderContext } from "../FolderContext";
import { useAuth } from "../AuthContext";

type Props = {
  activeFolderId: number | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const FolderList = () => {
  const { user } = useAuth();
  const { activeFolderId, setActiveFolderId, folders, setFolders }: Props =
    useContext(FolderContext);

  const handleFolderClick = (folder: Folder) => {
    console.log(folder);
    setActiveFolderId(folder.id);
  };

  return (
    <Flex direction="column" bg="white" w={120} roundedLeft={"md"}>
      {folders.length === 0 && (
        <Box paddingTop={4} textAlign={"center"}>
          <p>フォルダーがありません</p>
        </Box>
      )}
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

      {user.position_id !== 1 && (
        <CreateFolderButton
          folders={folders}
          setFolders={setFolders}
          setActiveFolderId={setActiveFolderId}
        />
      )}
    </Flex>
  );
};

export { FolderList };
