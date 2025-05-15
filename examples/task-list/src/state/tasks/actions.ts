import { newTaskId } from "@/utils";
import { TOGGLE_MODE } from "@/constants";
import { AppState } from "@/state/types";
import { TaskUpdateTextPayload } from "@/state/tasks/types";

export function addTask(payload: string) {
  return (state: AppState) => {
    state.tasks.unshift({
      id: newTaskId(state.tasks),
      text: payload,
      isDone: false,
    });
  };
}

export function updateTaskText(payload: TaskUpdateTextPayload) {
  return (state: AppState) => {
    const task = state.tasks.find((item) => item.id === payload.id);
    if (task) {
      task.text = payload.text;
    }
  };
}

export function toggleTask(action: number) {
  return (state: AppState) => {
    const task = state.tasks.find((item) => item.id === action);
    if (task) {
      task.isDone = !task.isDone;
    }

    const isAllDone = state.tasks.every((item) => item.isDone);
    if (isAllDone) {
      state.toggleMode = TOGGLE_MODE.undone;
    } else {
      state.toggleMode = TOGGLE_MODE.done;
    }
  };
}

export function deleteTask(action: number) {
  return (state: AppState) => {
    state.tasks = state.tasks.filter((item) => item.id !== action);
  };
}

export function clearCompletedTasks(state: AppState) {
  state.tasks = state.tasks.filter((item) => !item.isDone);
}

export function toggleAllTasks(state: AppState) {
  if (state.toggleMode === TOGGLE_MODE.done) {
    state.toggleMode = TOGGLE_MODE.undone;
    state.tasks.forEach((item) => (item.isDone = true));

    return;
  }
  if (state.toggleMode === TOGGLE_MODE.undone) {
    state.toggleMode = TOGGLE_MODE.done;
    state.tasks.forEach((item) => (item.isDone = false));
  }
}
