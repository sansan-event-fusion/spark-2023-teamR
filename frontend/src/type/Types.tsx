export type Folder = {
  id: number;
  title: string;
  vision: string;
  tasks: Task[];
};

export type Folders = Folder[];

export type Task = {
  id: number;
  title: string;
  content: string;
  status: "todo" | "doing" | "done";
};

export type Tasks = Task[];
