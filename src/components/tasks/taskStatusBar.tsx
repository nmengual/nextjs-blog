import Confetti from "@/components/tasks/confetti";
import FullView from "@/components/tasks/fullView";
import RefreshTasks from "@/components/tasks/refreshTasks";
import tasks from "@/components/tasks/tasks";
import TasksList from "@/components/tasks/tasksList";
import TrackTasks from "@/components/tasks/trackTasks";

let thrownConfetti = false;

const TaskStatusBar = async () => {
  const currentTask = tasks.find((task) => {
    return task.subTasks?.some((_task) => !_task.validateTask());
  });

  const subTasks = currentTask
    ? currentTask.subTasks.map((subTask, index) => {
        const isCompleted = subTask.validateTask();

        return {
          index,
          title: subTask.title,
          description: subTask.description,
          example: subTask.example,
          exampleTitle: subTask.exampleTitle,
          isCompleted,
        };
      })
    : [];

  const currentSubTaskActive = subTasks.find((subTask) => !subTask.isCompleted);

  if (!currentSubTaskActive) {
    if (!thrownConfetti) {
      thrownConfetti = true;
      return (
        <>
          <Confetti />
          <TrackTasks
            currentSubTaskActive={currentSubTaskActive}
            currentTask={currentTask}
          />
        </>
      );
    }

    return (
      <TrackTasks
        currentSubTaskActive={currentSubTaskActive}
        currentTask={currentTask}
      />
    );
  }

  return (
    <FullView
      Component={
        <TasksList
          currentTask={currentTask}
          currentSubTaskActive={currentSubTaskActive}
          subTasks={subTasks}
        />
      }
    >
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-3 border-t border-gray-300 flex justify-center hover:bg-gray-300">
        <div className="max-w-[1000px] flex flex-row items-center w-full px-3 gap-5 ">
          <div className="flex flex-row space-x-2 ">
            <span className="font-semibold">TASK</span>
            <span>{currentTask?.title}</span>
          </div>

          <div className="flex flex-row space-x-2 bg-white p-2 rounded-lg shadow">
            <span className="font-semibold">SUBTASK</span>
            <span>{currentSubTaskActive?.title}</span>
          </div>
        </div>
        <RefreshTasks />
      </div>
      <TrackTasks
        currentSubTaskActive={currentSubTaskActive}
        currentTask={currentTask}
      />
    </FullView>
  );
};

export default TaskStatusBar;
