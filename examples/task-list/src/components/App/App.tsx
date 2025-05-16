import TaskList from "@/components/TaskList/TaskList";
import TaskListHeader from "@/components/TaskListHeader/TaskListHeader";
import TaskListFooter from "@/components/TaskListFooter/TaskListFooter";
import ErrorBoundary from "@/components/commons/ErrorBoundary/ErrorBoundary";
import { selectTotalTasksCount } from "@/state/tasks/selectors";
import s from "./App.module.scss";
import { useAppSelector } from "@/state/store";

function App() {
  const tasksCount = useAppSelector(selectTotalTasksCount);
  return (
    <ErrorBoundary>
      <main className={s.main}>
        <h1 className={s.pageTitle}>todos</h1>
        <div className={s.appContainer}>
          <TaskListHeader />
          {!!tasksCount && (
            <>
              <TaskList />
              <TaskListFooter />
            </>
          )}
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
