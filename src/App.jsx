import React, { useState } from 'react';
import TaskCard from './components/TaskCard';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import { FiSearch } from "react-icons/fi";
import moment from "moment";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'This is the description for this task 1', dueDate: '20/08/2024', completed: true },
    { id: 2, title: 'Task 2', description: 'This is the description for this task 2', dueDate: '27/08/2024', completed: false },
    // { id: 3, title: 'Task 3', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 4, title: 'Task 4', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  
  const filteredTasks = tasks.filter(task => 
    activeCategory === 'completed' ? task.completed : 
    activeCategory === 'incompleted' ? !task.completed : 
    activeCategory === 'today' ? moment(task.dueDate, 'DD/MM/YYYY').isSame(moment(), 'day') :
    true
  );
  
  const onDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const onUpdateStatus = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };
   const onUpdateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

 const [searchQuery, setSearchQuery] = useState("");
  
  // Format the date using moment.js
  const formattedDate = moment().format("YYYY, MMM DD");

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
  };

  const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

  return (
    <div className="flex min-h-[44rem]">

      {/* SideBar + TaskProgress */}
      <Sidebar activeCategory={activeCategory} setActiveCategory={setActiveCategory} tasks={tasks} 
        showForm={showForm} 
        setShowForm={setShowForm}
        handleAddTask={handleAddTask} // Passing handleAddTask 
      />
    
      {/* Main Content */}
      <div className="w-full p-6 bg-slate-200 dark:bg-gray-950">
        <div className="flex justify-between mb-6 ">
          <div className="relative">
            <input
            type="search"
            placeholder="Search task"
            className="border rounded-lg px-3.5 py-3 text-lg text-left pr-36 dark:placeholder:text-black dark:text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* In React, you can use the size prop to increase the size of an icon from a library like React Icons. */}
            <FiSearch size={23}  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-black" />
          </div>
          <span className="text-gray-600 text-xl pr-28 content-center dark:text-gray-200">{formattedDate}</span>
          <button onClick={darkModeHandler}>
  <div className={`transition-transform duration-300 ${dark ? 'rotate-90' : ''}`}>
    {dark ? (
      <IoSunny size={28} className="fill-white" />
    ) : (
      <IoMoon size={28} />
    )}
  </div>
</button>
          <button
            className="bg-red-500 text-white hover:bg-red-700 px-8 rounded-lg shadow-md text-lg dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-red-500"
            onClick={() => setShowForm(true)}>
            Add new task
          </button>
        </div>
        
        <h1 className="font-semibold text-2xl text-gray-600 mb-8 dark:text-gray-200">All tasks ({filteredTasks.length} tasks)</h1>
        
        <div className="grid grid-cols-3 gap-4">
          {searchQuery === "" ? (
            filteredTasks.map(task => (
            <TaskCard 
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              onUpdateStatus={() => onUpdateStatus(task.id)}
              onUpdateTask={onUpdateTask}
            />
              ))) : 
              (
                filteredTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())).map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onDeleteTask={onDeleteTask}
                  onUpdateStatus={() => onUpdateStatus(task.id)}
                  onUpdateTask={onUpdateTask} 
                />
               ))
            )} 
          <div className="flex justify-center items-center rounded-lg h-[17rem] w-[95%] border-2 border-dashed border-gray-400 text-lg text-gray-400 dark:text-gray-200">
            {!showForm && <span>Add new task</span>}
            {showForm && (
              <TaskForm 
                className='p-4' 
                handleAddTask={handleAddTask} 
                setShowForm={setShowForm} 
              />)}
          </div>
        </div>
      </div>
    </div>
  )};
export default App;
