import { memo, useState } from "react";
import { selectTaskById } from "@/state/tasks/selectors";
import IconBtn from "@/components/commons/IconBtn/IconBtn";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/trash.svg";
import TaskEditor from "./TaskEditor/TaskEditor";
import s from "./TaskItem.module.scss";
import { useAppSelector, useUpdateAppStore } from "@/state/store";
import { deleteTask, toggleTask, updateTaskText } from "@/state/tasks/actions";

type props = {
  id: number;
};

function TaskItem({ id }: props) {
  const dispatch = useUpdateAppStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const task = useAppSelector((state) => selectTaskById(state, id));

  if (!task) {
    return null;
  }

  const { isDone, text } = task;

  function handleToggleTask() {
    dispatch(toggleTask(id));
  }

  function handleDeleteTask() {
    dispatch(deleteTask(id));
  }

  function handleEditMode(isEdit: boolean) {
    setIsEditMode(isEdit);
  }

  function handleTextInput(text?: string) {
    setIsEditMode(false);

    if (text) {
      dispatch(updateTaskText({ id, text }));
    }
  }

  return (
    <li className={`${s.taskItem} ${isDone ? s.taskItemDone : ""}`}>
      {isEditMode ? (
        <TaskEditor text={text} handleTextInput={handleTextInput} />
      ) : (
        <>
          <div className={s.taskWrapper}>
            <input
              className={s.taskCheckbox}
              type="checkbox"
              title="Update state"
              checked={isDone}
              onChange={handleToggleTask}
            />
            <span
              className={s.taskText}
              onDoubleClick={() => handleEditMode(true)}
            >
              {text}
            </span>
          </div>
          <IconBtn
            title="Edit Task"
            classes={[s.btnEditTask]}
            onClick={() => handleEditMode(true)}
          >
            <EditIcon />
          </IconBtn>
          <IconBtn
            title="Delete Task"
            classes={[s.btnDeleteTask]}
            onClick={handleDeleteTask}
          >
            <DeleteIcon />
          </IconBtn>
        </>
      )}
    </li>
  );
}

const MemoizedTaskItem = memo(TaskItem);

export default MemoizedTaskItem;
