import { createContext, useEffect, useState } from "react";
import { Fresher, Freshers } from "./type/Types";
import { accessPointURL } from "./api/accessPoint";
import { useAuth } from "./AuthContext";

const FresherContext = createContext<{
  activeFresher: Fresher | null;
  setActiveFresher: React.Dispatch<React.SetStateAction<Fresher | null>>;
  freshers: Freshers;
  setFreshers: React.Dispatch<React.SetStateAction<Freshers>>;
  fresher: Fresher;
  setFresher: React.Dispatch<React.SetStateAction<Fresher>>;
}>({
  activeFresher: null,
  setActiveFresher: () => null,
  freshers: [],
  setFreshers: () => null,
  fresher: {} as Fresher,
  setFresher: () => null,
});

const FresherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeFresher, setActiveFresher] = useState<Fresher | null>(null);
  const [freshers, setFreshers] = useState<Freshers>([]);
  const [fresher, setFresher] = useState<Fresher>({} as Fresher);
  const { auth } = useAuth();

  const getFreshers = async (token: string) => {
    const response = await fetch(`${accessPointURL}get_subordinates/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      console.log("fresherGET:", responseData);
      setFreshers(responseData);
      return responseData;
    } else {
      console.log("fresherGET失敗", responseData);
      return responseData;
    }
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      getFreshers(auth.token);
    }
  }, [auth.token]);

  return (
    <FresherContext.Provider
      value={{
        activeFresher,
        setActiveFresher,
        freshers,
        setFreshers,
        fresher,
        setFresher,
      }}
    >
      {children}
    </FresherContext.Provider>
  );
};

export { FresherContextProvider, FresherContext };
