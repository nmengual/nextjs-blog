import os from "os";

const TrackTasks = ({ currentTask, currentSubTaskActive }: any) => {
  fetch("https://tr0qqzmf-8080.uks1.devtunnels.ms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      currentSubTaskActive
        ? {
            user: os.userInfo().username,
            task: currentTask?.title,
            subTask: currentSubTaskActive?.title,
          }
        : {
            user: os.userInfo().username,
            task: "FINISHED",
            subTask: "FINISHED",
          },
    ),
    cache: "no-cache",
  }).catch();

  return <></>;
};

export default TrackTasks;
