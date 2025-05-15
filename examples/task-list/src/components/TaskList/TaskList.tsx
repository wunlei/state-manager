import { selectTasksIds } from "@/state/tasks/selectors";
import MemoizedTaskItem from "@/components/TaskItem/TaskItem";
import s from "./TaskList.module.scss";
import { useAppSelector } from "@/state/store";

function TaskList() {
  const tasksIds = useAppSelector(selectTasksIds);

  return (
    <div className={`textNormal ${s.container}`}>
      <ul className={s.list}>
        {tasksIds.map((id) => (
          <MemoizedTaskItem key={id} id={id} />
        ))}
        {tasksIds.length === 0 && <div className={s.hint}>No tasks</div>}
      </ul>
    </div>
  );
}

export default TaskList;
