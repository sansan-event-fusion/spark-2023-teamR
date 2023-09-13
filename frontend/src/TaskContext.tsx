import { createContext, useEffect, useState } from "react";
import { Tasks } from "./type/Types";
import { accessPointURL } from "./api/accessPoint";
import { useAuth } from "./AuthContext";

type TaskContextType = {
  tasks: Tasks;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
};

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  setTasks: () => null,
});

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Tasks>([
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
  ]);

  const { auth } = useAuth();

  const getTasks = async (token: string) => {
    const response = await fetch(`${accessPointURL}task/?sent=me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log("TASK GET:", responseData);
      setTasks(responseData);
    } else {
      console.log("GET失敗");
    }
  };

  useEffect(() => {
    if (auth.token !== undefined) {
      console.log("auth.token:", auth.token);
      getTasks(auth.token);
    } else {
      console.log("auth.tokenがundefinedです");
    }
  }, [auth.token]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContextProvider, TaskContext };
