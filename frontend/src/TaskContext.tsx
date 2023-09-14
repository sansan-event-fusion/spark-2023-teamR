import { createContext, useEffect, useState } from "react";
import { Task, Tasks } from "./type/Types";
import { accessPointURL } from "./api/accessPoint";
import { useAuth } from "./AuthContext";

type TaskContextType = {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
  tasks: Tasks;
  setTasks: React.Dispatch<React.SetStateAction<Tasks>>;
};

const TaskContext = createContext<TaskContextType>({
  task: {
    title: "",
    content: "",
    status: "todo",
    id: 0,
  },
  setTask: () => null,
  tasks: [],
  setTasks: () => null,
});

const TaskContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [task, setTask] = useState<Task>({
    title: "",
    content: "",
    status: "todo",
    id: 0,
  });
  const [tasks, setTasks] = useState<Tasks>([]);

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
  }, [auth.token, task]);

  return (
    <TaskContext.Provider value={{ task, setTask, tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContextProvider, TaskContext };
