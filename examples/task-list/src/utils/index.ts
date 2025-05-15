import { Tasks } from "../state/tasks/types";

export function newTaskId(tasks: Tasks) {
  const maxId = tasks.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}
