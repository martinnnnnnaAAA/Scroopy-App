"use client";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <>
      <NavBar direccionA="Tareas" />
      <div className="todo-container">
        <h1>
          <span>Administrar</span> Tareas
        </h1>
        <div className="sub-container">
          <div className="input-container">
            <input
              type="text"
              placeholder="Agrega una nueva tarea"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={handleAddTask}>
              <span>Crear</span>
            </button>
          </div>

          <div className="tasks-container">
            <div className="tasks-header">
              <div className="header-left">
                <h3>Tareas creadas</h3>
                <span>{tasks.filter((task) => !task.completed).length}</span>
              </div>
              <div className="header-right">
                <h3>Terminadas</h3>
                <span>
                  {tasks.filter((task) => task.completed).length}/
                  {tasks.length}
                </span>
              </div>
            </div>

            {tasks.length === 0 && <p>No tienes tareas pendientes.</p>}

            {/* Lista de tareas no completadas */}
            <ul className="task-list">
              {tasks
                .filter((task) => !task.completed)
                .map((task, index) => {
                  const originalIndex = tasks.findIndex(
                    (t) => t.text === task.text
                  );
                  return (
                    <li key={originalIndex} className="task-item">
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleCompleteTask(originalIndex)}
                        />
                        <span>{task.text}</span>
                      </div>
                      <button onClick={() => handleDeleteTask(originalIndex)}>
                        🗑️
                      </button>
                    </li>
                  );
                })}
            </ul>

            {/* Lista de tareas completadas */}
            <ul className="task-list">
              {tasks
                .filter((task) => task.completed)
                .map((task, index) => {
                  const originalIndex = tasks.findIndex(
                    (t) => t.text === task.text
                  );
                  return (
                    <li key={originalIndex} className="task-item completed">
                      <div className="task-content">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleCompleteTask(originalIndex)}
                        />
                        <span>{task.text}</span>
                      </div>
                      <button onClick={() => handleDeleteTask(originalIndex)}>
                        🗑️
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <style jsx>{`
          .todo-container {
            margin: 50px auto;
            max-width: 800px;
            padding: 20px;
            text-align: center;
          }
          h1 span {
            color: #4c9ee3;
            font-size: 2.5rem;
          }
          .input-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }
          input {
            padding: 10px;
            font-size: 1rem;
            width: 70%;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-right: 10px;
          }
          button {
            background-color: #004080;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
          }
          .tasks-container {
            width: 100%;
            text-align: left;
          }
          .tasks-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          .header-left, .header-right {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .header-left h3, .header-right h3 {
            margin: 0;
            font-size: 1.2rem;
            color: #004080;
          }
          .header-left span, .header-right span {
            font-size: 1.5rem;
            color: #4c9ee3;
            font-weight: bold;
          }
          .task-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .task-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            margin-bottom: 15px;
            background-color: #f9f9f9;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            gap: 15px;
          }
          .task-content {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .task-item.completed span {
            text-decoration: line-through;
            color: gray;
          }
          .task-item input[type="checkbox"] {
            width: 20px;
            height: 20px;
          }
          button {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
};

export default TodoList;
