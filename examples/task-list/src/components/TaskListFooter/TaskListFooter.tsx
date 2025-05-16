import { FILTERS } from "@/constants";
import { selectCurrFilter } from "@/state/filters/selectors";
import {
  selectHasCompletedTasks,
  selectUndoneTasksCount,
} from "@/state/tasks/selectors";
import s from "./TaskListFooter.module.scss";
import { useAppSelector, useUpdateAppStore } from "@/state/store";
import { changeFilter } from "@/state/filters/actions";
import { clearCompletedTasks } from "@/state/tasks/actions";
import type { FiltersValues } from "@/state/filters/types";

function TaskListFooter() {
  const dispatch = useUpdateAppStore();
  const undoneCount = useAppSelector(selectUndoneTasksCount);
  const currentFilter = useAppSelector(selectCurrFilter);
  const hasCompleted = useAppSelector(selectHasCompletedTasks);

  function handleChangeFilter(filter: FiltersValues) {
    dispatch(changeFilter(filter));
  }

  function handleClearCompleted() {
    dispatch(clearCompletedTasks);
  }

  return (
    <div className={`${s.container} textNormal`}>
      <span>Tasks left: {undoneCount}</span>
      <div>
        {Object.values(FILTERS).map((filter: FiltersValues) => (
          <button
            className={`${s.tab} ${
              currentFilter === filter ? s.tabActive : ""
            }`}
            key={filter}
            onClick={() => handleChangeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <button
        className={`${s.btnClearCompleted} ${hasCompleted ? "" : s.btnHidden}`}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </div>
  );
}

export default TaskListFooter;
