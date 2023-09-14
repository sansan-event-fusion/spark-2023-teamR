import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { accessPointURL } from "./api/accessPoint";
import { FresherContext } from "./fresherContext";
import { Folders } from "./type/Types";

type ElderFolderContextType = {
  elderFolders: Folders;
  setElderFolders: React.Dispatch<React.SetStateAction<Folders>>;
};

const ElderFolderContext = createContext<ElderFolderContextType>({
  elderFolders: [],
  setElderFolders: () => null,
});

const ElderFolderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [elderFolders, setElderFolders] = useState<Folders>([]);
  const { auth } = useAuth();
  const { fresher } = useContext(FresherContext);

  const getElderFolder = async ({
    token,
    fresherId,
  }: {
    token: string;
    fresherId: number;
  }) => {
    const getElderFolders = async (token: string, fresherId: number) => {
      const response = await fetch(
        `${accessPointURL}folders/?receiver_id=${fresherId}`,
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
    getElderFolders(token, fresherId);
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      getElderFolder({ token: auth.token, fresherId: fresher.id });
    }
  }, [auth.token, fresher.id]);

  return (
    <ElderFolderContext.Provider
      value={{
        elderFolders,
        setElderFolders,
      }}
    >
      {children}
    </ElderFolderContext.Provider>
  );
};

export { ElderFolderContext, ElderFolderContextProvider };
