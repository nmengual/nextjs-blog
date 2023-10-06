import { Checkbox } from "@/components/ui/checkbox";
import { Code } from "bright";

export const dynamic = "force-dynamic";

const TasksList = async ({ currentTask, subTasks, currentSubTaskActive }) => {
  const renderSubTask = async (subTask: (typeof subTasks)["0"]) => {
    const isActive = currentSubTaskActive?.title === subTask.title;

    return (
      <div
        key={subTask.title}
        className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3  ${
          subTask.isCompleted
            ? "bg-green-50"
            : isActive
            ? "bg-yellow-50"
            : "bg-gray-50"
        }`}
      >
        <Checkbox checked={subTask.isCompleted} />
        <div className="flex flex-col space-y-1 w-full">
          <label
            className={`text-base font-medium leading-none  ${
              subTask.isCompleted ? "line-through" : ""
            }`}
          >
            {subTask.title}
          </label>
          <span className="text-sm text-gray-600">{subTask.description}</span>
          {isActive && !!subTask.example && (
            <Code
              lang="js"
              title={subTask.exampleTitle}
              codeClassName="my-0 w-full"
            >
              {subTask.example}
            </Code>
          )}
        </div>
      </div>
    );
  };

  if (!currentTask) {
    return <div>Your completed</div>;
  }

  return (
    <div className="flex flex-col container pt-6 space-y-5">
      <h1 className="font-semibold text-5xl">Tasks</h1>
      <h2 className="text-3xl">{currentTask.title}</h2>
      {subTasks.map(renderSubTask)}
    </div>
  );
};

export default TasksList;
