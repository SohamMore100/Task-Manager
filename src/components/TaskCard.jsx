import React,{useState} from 'react';
import { FaRegStar } from "react-icons/fa";
import { HiTrash } from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";
import { IoCalendarOutline } from "react-icons/io5";
import ConfirmationDialog from './ConfirmationDialog';
import DatePicker from "react-datepicker";

const TaskCard = ({ task, onUpdateStatus, onDeleteTask, onUpdateTask }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editCompleted, setEditCompleted] = useState(task.completed);

  const handleSave = () => {
    onUpdateTask(task.id, { title: editTitle, description: editDescription, dueDate: editDueDate, completed: editCompleted });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    setIsDialogOpen(false);
  };
  const handleStartDateChange = (date) => {
    console.log(setStartDate(date));
  };

  return (
<>
      <div className={`p-4 rounded-lg shadow ${task.completed ? 'bg-red-100' : 'bg-white'} h-[102%] w-[95%]`}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="date"
              
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />
            <label className="block text-gray-700 font-bold mb-2">
              Completed:
              <input
                type="checkbox"
                checked={editCompleted}
                onChange={(e) => setEditCompleted(e.target.checked)}
                className="ml-2"
              />
            </label>
            <div className="flex justify-between mt-2">
              <button onClick={handleSave} className="bg-blue-500 font-medium text-white px-3 py-2 rounded-md">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 font-medium text-white px-3 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className={`font-bold text-lg ${task.completed ? 'text-red-500' : 'text-gray-600 dark:text-black'} pb-4`}>
              {task.title}
            </h3>
            <p className={`font-medium text-base ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-700'} pb-20`}>
              {task.description}
            </p>
            <div className='flex gap-3'>
              <IoCalendarOutline className={`text-2xl ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-900'}`} />
              <p className={`text-lg font-semibold ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-950'}`}>
                {task.dueDate}
              </p>
            </div>
            <hr className={`mt-4 mb-5 border-solid border rounded-lg w-full  ${task.completed ? 'border-red-500' : 'border-dashed border-gray-300 dark:border-gray-500'}`} />
            <div className="flex justify-between mt-2">
              <span className={` font-bold text-base ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-900'}`}>
                {task.completed ? 'Completed' : 'Incompleted'}
              </span>
              <div className="flex space-x-4">   
                {!task.completed && (
                  <FaRegStar onClick={onUpdateStatus} className={`text-2xl text-gray-500 dark:text-gray-900`}/>
                )}
                <HiTrash
                  onClick={() => setIsDialogOpen(true)}
                  className={`text-2xl ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-900'}`}
                />
                <HiDotsVertical
                  onClick={() => setIsEditing(!isEditing)}
                  className={`text-2xl ${task.completed ? 'text-red-500' : 'text-gray-500 dark:text-gray-900'}`}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
export default TaskCard;
