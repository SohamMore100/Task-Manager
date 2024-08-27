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
    { id: 3, title: 'Task 3', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 4, title: 'Task 4', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 5, title: 'Task 5', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 6, title: 'Task 6', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 7, title: 'Task 7', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 8, title: 'Task 8', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 9, title: 'Task 9', description: 'This is the description for this task 2', dueDate: '30/08/2024', completed: false },
    // { id: 10, title: 'Task 10', description: 'This is the description for this task 2',dueDate:'26/08/2024', completed: false },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  
  const filteredTasks = tasks.filter(task => 
    activeCategory === 'completed' ? task.completed : 
    activeCategory === 'incompleted' ? !task.completed : 
    activeCategory === 'today' ? moment(task.dueDate, 'DD/MM/YYYY').isSame(moment(), 'day') :
    true
  );
// This code is using the filter() method to create a new array filteredTasks that contains only the tasks that meet certain conditions.
// The condition is specified by the callback function passed to filter(). This callback function takes a task as an argument and returns a boolean value indicating whether the task should be included in the filtered array.
// The callback function uses the ternary operator to determine the return value. The ternary operator is a shorthand way of writing a conditional statement. 
// It has the following syntax:
// condition ? trueValue : falseValue
// If condition is true, the expression returns trueValue. If condition is false, the expression returns falseValue.

// So, the overall logic is:
// If activeCategory is 'completed', only include completed tasks.
// If activeCategory is 'incompleted', only include tasks that are not completed.
// If activeCategory is neither 'completed' nor 'incompleted', include all tasks.  

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
 // Format the date to "2024, Aug 20"
  // const formatDate = () => {
  //   const date = new Date();
  //   const options = { year: 'numeric', month: 'short', day: 'numeric' };
  //   return date.toLocaleDateString('en-GB', options).replace(',', '');
  // };
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
        setShowForm={setShowForm} // Passing showForm and setShowForm
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

// {-----------------------------------------------------------------------}

// Let's break down the search code process in your React application:

// Search Input Field

// The search input field is defined in the JSX code:

// javascript
// Edit
// Copy code
// <input
//   type="search"
//   placeholder="Search task"
//   className="border rounded-lg p-[3.5%] text-lg text-left pr-36 "
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)}
// />
// Here, we have an input element with a type attribute set to "search", which allows the user to enter a search query. The value attribute is bound to the searchQuery state variable using the useState hook. When the user types something in the input field, the onChange event is triggered, which updates the searchQuery state variable with the new value.

// Search Logic

// The search logic is implemented in the filteredTasks variable:

// javascript
// Edit
// Copy code
// const searchedTasks = filteredTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()));
// Here, we're using the filter() method to create a new array of tasks that match the search query. We're filtering the filteredTasks array, which is already filtered by the activeCategory state variable.

// The filter() method takes a callback function as an argument, which is called for each task in the filteredTasks array. The callback function checks if the task's title property (converted to lowercase) includes the search query (also converted to lowercase) using the includes() method. If the task's title matches the search query, it's included in the new searchedTasks array.

// Rendering Searched Tasks

// The searched tasks are rendered in the JSX code:

// javascript
// Edit
// Copy code
// <div className="grid grid-cols-3 gap-4">
//   {searchQuery === "" ? (
//     filteredTasks.map(task => (
//       <TaskCard 
//         key={task.id} 
//         task={task} 
//         onUpdateStatus={() => handleUpdateStatus(task.id)} 
//       />
//     ))
//   ) : (
//     filteredTasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())).map(task => (
//       <TaskCard 
//         key={task.id} 
//         task={task} 
//         onUpdateStatus={() => handleUpdateStatus(task.id)} 
//       />
//     ))
//   )}
// </div>
// Here, we're using a conditional statement to render either the original filteredTasks array or the searchedTasks array, depending on whether the search query is empty or not. If the search query is empty, we render the original filteredTasks array. If the search query is not empty, we render the searchedTasks array.

// In both cases, we're mapping over the tasks array and rendering a TaskCard component for each task, passing the task object as a prop.

// Overall, the search code process involves:

// Updating the searchQuery state variable when the user types something in the search input field.
// Filtering the filteredTasks array based on the search query using the filter() method.
// Rendering the searched tasks in the JSX code, using a conditional statement to switch between the original filteredTasks array and the searchedTasks array.