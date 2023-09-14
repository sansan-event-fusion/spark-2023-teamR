import { useContext, useState } from "react";
import { FresherContext } from "../fresherContext";
import { accessPointURL } from "../api/accessPoint";
import { Folder } from "../type/Types";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CreateFolderButton } from "./atoms/CreateFolderButton";
import { FolderContext } from "../FolderContext";
import { useAuth } from "../AuthContext";
import { ElderFolderContext } from "../ElderFolderContext";

const ElderFolderList = () => {
  const { auth } = useAuth();
  const { fresher } = useContext(FresherContext);
  const { activeFolderId, setActiveFolderId } = useContext(FolderContext);
  const [elderFolders, setElderFolders] = useState<Folder[]>([]);

  const getFresherFolders = async (token: string) => {
    const response = await fetch(
      `${accessPointURL}folders/?receiver_id=${fresher.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    const responseData = await response.json();
    setElderFolders(responseData);
  };

  const handleFolderClick = (folder: Folder) => {
    console.log(folder);
    setActiveFolderId(folder.id);
  };

  getFresherFolders(auth.token);

  return (
    <Flex direction="column" bg="white" w={120} roundedLeft={"md"}>
      {elderFolders.length === 0 && (
        <Box paddingTop={4} textAlign={"center"}>
          <p>フォルダーがありません</p>
        </Box>
      )}
      {elderFolders.map((folder) => (
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

      <CreateFolderButton />
    </Flex>
  );
};

export { ElderFolderList };
