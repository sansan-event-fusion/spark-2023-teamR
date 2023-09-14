import { createContext, useEffect, useState } from "react";
import { Fresher, Freshers } from "./type/Types";
import { accessPointURL } from "./api/accessPoint";
import { useAuth } from "./AuthContext";

const FresherContext = createContext<{
  activeFresher: Fresher | null;
  setActiveFresher: React.Dispatch<React.SetStateAction<Fresher | null>>;
  freshers: Freshers;
  setFreshers: React.Dispatch<React.SetStateAction<Freshers>>;
}>({
  activeFresher: null,
  setActiveFresher: () => null,
  freshers: [],
  setFreshers: () => null,
});

const FresherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeFresher, setActiveFresher] = useState<Fresher | null>(null);
  const [freshers, setFreshers] = useState<Freshers>([]);

  const { auth } = useAuth();

  const getFreshers = async (token: string) => {
    console.log("---------------------------------------");
    console.log("freshertoken", token);
    const response = await fetch(`${accessPointURL}get_subordinates/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    const responseData = await response.json();
    if (responseData.status === 200) {
      console.log("fresherGET:", responseData);
      return responseData;
    } else {
      console.log("fresherGET失敗", responseData);
      return responseData;
    }
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      console.log("Fresher前auth.token:", auth.token);
      getFreshers(auth.token);
    }
  }, [auth.token]);

  return (
    <FresherContext.Provider
      value={{ activeFresher, setActiveFresher, freshers, setFreshers }}
    >
      {children}
    </FresherContext.Provider>
  );
};

export { FresherContextProvider, FresherContext };
