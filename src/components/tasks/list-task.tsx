import { useTaskActions } from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const ListTask = () => {
  const { tasks } = useTaskActions();
  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        // Ensure task has all required properties for Task type
        <ItemTask
          key={task.id}
          task={{
            ...task,
            title: task.title ?? "",
            completed: task.completed ?? false,
            userId: task.userId ?? "",
          }}
        />
      ))}
    </div>
  );
};
export default ListTask;
