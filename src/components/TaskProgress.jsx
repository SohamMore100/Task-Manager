import React from 'react';

const TaskProgress = ({ completedTasks, totalTasks }) => {
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-4 rounded-md w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg text-gray-500 font-semibold dark:text-gray-200">All tasks</span>
        <span className="text-lg text-gray-500 dark:text-gray-200">{`${completedTasks}/${totalTasks}`}</span>
      </div>
      <div className="w-full rounded-full h-2.5 bg-slate-200">
        <div
          className="bg-red-500 h-2.5 rounded-full"
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskProgress;
