import { createSelector } from "reselect";
import { selectCurrFilter } from "../filters/selectors";
import { FILTERS } from "@/constants";
import type { AppState } from "@/state/types";

const selectState = (state: AppState) => state;

export const selectTasks = createSelector(
  [selectState, selectCurrFilter],
  (slice: AppState, filter) => {
    if (filter === FILTERS.COMPLETED) {
      return slice.tasks.filter((task) => task.isDone);
    }

    if (filter === FILTERS.ACTIVE) {
      return slice.tasks.filter((task) => !task.isDone);
    }

    return slice.tasks;
  },
);

export const selectTasksIds = createSelector([selectTasks], (list) => {
  return list.map((task) => task.id);
});

export const selectTaskById = createSelector(
  [selectTasks, (_: AppState, id: number) => id],
  (tasks, id: number) => {
    return tasks.find((task) => task.id === id);
  },
);

export const selectUndoneTasksCount = createSelector([selectTasks], (tasks) => {
  return tasks.filter((task) => !task.isDone).length;
});

export const selectHasCompletedTasks = (state: AppState) => {
  return state.tasks.some((task) => task.isDone);
};

export const selectTotalTasksCount = (state: AppState) => {
  return state.tasks.length;
};
