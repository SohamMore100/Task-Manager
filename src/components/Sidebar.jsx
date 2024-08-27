import React,{useState} from 'react';
import TaskProgress from './TaskProgress';
import moment from 'moment';
import TaskForm from './TaskForm';
const Sidebar = ({ activeCategory, setActiveCategory, tasks, showForm, setShowForm, handleAddTask }) => {

function getCategoryLabel(category) {
  switch (category) {
    case 'today':
      return `Today's tasks`;
    case 'all':
      return 'All tasks';
    case 'completed':
      return 'Completed tasks';
    case 'incompleted':
      return 'Incompleted tasks';
    default:
      return '';
  }
}
 // Filter tasks based on today's date
  const today = moment().format('DD/MM/YYYY'); // Get today's date in DD/MM/YYYY format
  const todaysTasks = tasks.filter(task => moment(task.dueDate).format('DD/MM/YYYY') === today);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const categories = ['today', 'all', 'completed', 'incompleted'];


  return (
    <aside className="w-1/4 bg-white-100 dark:bg-slate-900">
        <h2 className="pt-8 text-center font-bold text-2xl text-gray-600 dark:text-gray-200">TASK MANAGER</h2>
        <div className='p-4 pt-7 pb-7'>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-red-500 w-full text-lg bg-red-500 text-white p-3 rounded-lg shadow-md hover:bg-red-700"
        >
          <span>Add new task</span>
        </button>
      </div>
    
        {/* <ul className='space-y-3 text-gray-500 text-lg font-semibold '>
         <li
          className={`relative cursor-pointer py-2 pl-4 ${
           activeCategory === 'today' ? 'bg-purple-100 text-red-500' : '' }`}
             onClick={() => setActiveCategory('today')}
            >
            Today's tasks
           {activeCategory === 'today' && (
            <span className="absolute right-0 top-0 h-full w-1 bg-red-500"></span>
           )}
          </li>
          <li 
            className={`relative cursor-pointer py-2 pl-4 ${activeCategory === 'all' ? 'bg-purple-100 text-red-500' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All tasks
            {activeCategory === 'all' && (
            <span className="absolute right-0 top-0 h-full w-1 bg-red-500"></span>
           )}
          </li>
          <li 
            className={`relative cursor-pointer py-2 pl-4 ${activeCategory === 'completed' ? 'bg-purple-100 text-red-500' : ''}`}
            onClick={() => setActiveCategory('completed')}
          >
            Completed tasks
            {activeCategory === 'completed' && (
            <span className="absolute right-0 top-0 h-full w-1 bg-red-500"></span>
           )}
          </li>
          <li 
            className={`relative cursor-pointer py-2 pl-4 ${activeCategory === 'incompleted' ? 'bg-purple-100 text-red-500' : ''}`}
            onClick={() => setActiveCategory('incompleted')}
          >
            Incompleted tasks
            {activeCategory === 'incompleted' && (
            <span className="absolute right-0 top-0 h-full w-1 bg-red-500"></span>
           )}
          </li>
        </ul> */}

        <ul className='space-y-3 text-gray-500 text-lg font-semibold dark:text-gray-200'>
          {categories.map((category) => (
          <li
            key={category}
            className={`relative cursor-pointer py-2 pl-4 ${activeCategory === category ? 'bg-purple-100 text-red-500 dark:bg-purple-100 dark:text-red-500' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {getCategoryLabel(category)}
            {activeCategory === category && (
              <span className="absolute right-0 top-0 h-full w-1 bg-red-500"></span>
            )}
          </li>
          ))}
        </ul>
{/* Extracted the list of categories into a separate array categories.
Used map to render the list items, which makes the code more concise and easier to maintain.
Removed the duplicated code for each list item and instead used a single template for all categories.
Used a separate function getCategoryLabel to get the label for each category, which makes the code more readable and easier to maintain.
Used key prop to assign a unique key to each list item, which is a good practice for React.
Simplified the conditional rendering of the active class using a template literal.
This code is more concise, easier to maintain, and follows best practices for React. */}         
          <div className="pt-52">
            <TaskProgress completedTasks={completedTasks} totalTasks={totalTasks} />
          </div>
      </aside>
  );
}
export default Sidebar;
