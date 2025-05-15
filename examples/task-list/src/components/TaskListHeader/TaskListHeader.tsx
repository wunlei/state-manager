import { useState } from "react";
import IconBtn from "@/components/commons/IconBtn/IconBtn";
import AddTaskIcon from "@/assets/plus-circle.svg";
import ToggleAllIcon from "@/assets/checklist.svg";
import s from "./TaskListHeader.module.scss";
import { selectTotalTasksCount } from "@/state/tasks/selectors";
import { useAppSelector, useUpdateAppStore } from "@/state/store";
import { addTask, toggleAllTasks } from "@/state/tasks/actions";

function TaskListHeader() {
  const [taskText, setTaskText] = useState("");
  const tasksCount = useAppSelector(selectTotalTasksCount);
  const dispatch = useUpdateAppStore();

  function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskText(e.target.value);
  }

  function handleAddTask() {
    const text = taskText.trim();

    if (text) {
      dispatch(addTask(text));
    }

    setTaskText("");
  }

  function handleToggleAll() {
    dispatch(toggleAllTasks);
  }

  return (
    <div className={`textNormal ${s.container}`}>
      {!!tasksCount && (
        <IconBtn title="Toggle all" onClick={handleToggleAll}>
          <ToggleAllIcon />
        </IconBtn>
      )}
      <input
        autoFocus
        value={taskText}
        onChange={handleTextInput}
        className={`input ${s.inputTaskText}`}
        placeholder="What needs to be done?"
        onBlur={handleAddTask}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            handleAddTask();
          }
        }}
      />
      <IconBtn
        classes={[`${!taskText && "btnHidden"}`]}
        title="Add task"
        onClick={handleAddTask}>
        <AddTaskIcon />
      </IconBtn>
    </div>
  );
}

export default TaskListHeader;
