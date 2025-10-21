import React, { useState } from 'react';
import './TodoList.css';


const Header = () => (
  <div className="header">
    <h1> My To-Do List </h1>
  </div>
);

const TodoList = () => {
 
  const [tasks, setTasks] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const [editingId, setEditingId] = useState(null);




  const handleAddTask = () => {
    if (!inputValue.trim()) 
        return; 

    if (editingId !== null) {

      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: inputValue } : task
      ));
      setEditingId(null); 
    } else {
      const newTask = {
        id: Date.now(), 
        text: inputValue,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    setInputValue(''); 
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInputValue('');
    }
  };


  const handleEditTask = (task) => {
    setEditingId(task.id);
    setInputValue(task.text);
   
  };


  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  

  return (
    <div className="todo-container">
      <Header />
      

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button onClick={handleAddTask}>
          {editingId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>


      <ul className="task-list">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span 
              className="task-text"
              onClick={() => handleToggleComplete(task.id)} 
            >
              {task.text}
            </span>
            
           
            <div className="task-actions">
              <button 
                className="action-btn edit-btn"
                onClick={() => handleEditTask(task)}
                disabled={task.completed} 
              >
                ✏️
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
      

      {tasks.length === 0 && <p className="no-tasks">🎉 Your list is empty. Add a task!</p>}
    </div>
  );
};

export default TodoList;