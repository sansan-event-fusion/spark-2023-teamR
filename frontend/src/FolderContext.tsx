//FolderList.tsxとTaskListSpace.tsxで同じフォルダーの情報をuseContextで共有する

import { ReactNode, createContext, useState } from "react";
import { Folders } from "./type/Types";

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
  const [folders, setFolders] = useState<Folders>([
    {
      id: 1,
      title: "フォルダ1",
      vision: "ビジョン1",
      tasks: [
        {
          id: 1,
          title: "タスク1",
          content: "タスク1の内容",
          status: "todo",
        },
        {
          id: 2,
          title: "タスク2",
          content: "タスク2の内容",
          status: "doing",
        },
        {
          id: 3,
          title: "タスク3",
          content: "タスク3の内容",
          status: "done",
        },
      ],
    },
  ]);

  return (
    <FolderContext.Provider
      value={{ activeFolderId, setActiveFolderId, folders, setFolders }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export { FolderContextProvider, FolderContext };
