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
export type Auth = {
  token: string;
  // user: User;
};
export type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login: string;
  company_id: number;
  position_id: number;
  count_emotions: number;
  count_comment: number;
};

export type Comment = {
  id: number;
  user_name: string;
  position: string;
  content: string;
};

export type Comments = Comment[];

export type Fresher = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login: string;
  company_id: number;
  position_id: number;
  count_emotions: number;
  count_comment: number;
};

export type Emotion = {
  id: number;
  task_id: string;
  emotion_type: string;
};

export type Freshers = Fresher[];
