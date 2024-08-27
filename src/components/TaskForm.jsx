import React, { useState } from 'react';
import moment from 'moment';

const TaskForm = ({ handleAddTask, setShowForm }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = moment(dueDate).format('DD/MM/YYYY');
    // Save the task with the formatted date
    handleAddTask({ title, description, dueDate: formattedDate, completed });
    setShowForm(false); // Close the form after adding the task
  };

  return (
    <form onSubmit={handleSubmit} className='p-3'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-1 border rounded-md dark:text-gray-900"
          placeholder="Enter task title"
          required
        />

        <textarea value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 p-1 border rounded-md dark:text-gray-900"
          placeholder="Enter description"
          required
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full mb-2 p-1 border rounded-md dark:text-gray-900"
          required
        />

        <label className="text-gray-700 font-semibold dark:text-gray-100">
          Completed:
        </label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="ml-2 mr-2"
        />
        <span>{completed ? "Yes" : "No"}</span>

      <div className="flex justify-between mt-1">
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="bg-blue-500 text-white font-medium px-4 py-1 rounded-md dark:bg-zinc-100 dark:text-blue-600 ">Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white font-medium px-4 py-1 rounded-md dark:bg-zinc-100 dark:text-green-600 dark:font-semibold">Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
