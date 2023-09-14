import { ReactNode, createContext, useEffect, useState } from "react";
import { Folders } from "./type/Types";
import { accessPointURL } from "./api/accessPoint";
import { useAuth } from "./AuthContext";

const FolderContext = createContext<{
  activeFolderId: number | null;
  setActiveFolderId: React.Dispatch<React.SetStateAction<number | null>>;
  folders: Folders;
  setFolders: React.Dispatch<React.SetStateAction<Folders>>;
}>({
  activeFolderId: null,
  setActiveFolderId: () => null,
  folders: [],
  setFolders: () => null,
});

const FolderContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null);
  const [folders, setFolders] = useState<Folders>([]);

  const { auth } = useAuth();

  const getFolders = async (token: string) => {
    const response = await fetch(
      `${accessPointURL}folders/?type=received&status=todo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const responseData = await response.json();
      console.log("GET成功:", responseData);
      setFolders(responseData);
    } else {
      console.log("GET失敗");
    }
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      console.log("auth.token:", auth.token);
      getFolders(auth.token);
    } else {
      console.log("auth.tokenがundefinedです");
    }
  }, [auth.token]);

  return (
    <FolderContext.Provider
      value={{ activeFolderId, setActiveFolderId, folders, setFolders }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export { FolderContextProvider, FolderContext };
