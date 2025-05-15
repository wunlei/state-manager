export type Task = {
  id: number;
  text: string;
  isDone: boolean;
};

export type Tasks = Task[];

export type TaskUpdateTextPayload = Pick<Task, "id" | "text">;
