import React, { useEffect, useState } from "react";
import "./List.css";

const List = ({ tasks, setTasks }) => {
  const [counter, setCounter] = useState(tasks.length);

  useEffect(() => {
    setCounter(tasks.length);
  }, [tasks]);

  const handleDeleteTask = (idToDelete) => {
    const updatedTasks = tasks.filter((task) => task.id !== idToDelete);
    setTasks(updatedTasks);

    fetch(`https://playground.4geeks.com/todo/todos/${idToDelete}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-center">No hay tareas, añadir tareas.</p>
      ) : (
        <ul className="list-group rounded-0">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.label}
              <button
                onClick={() => handleDeleteTask(task.id)}

                className="btn btn-sm delete-button"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
      {counter > 0 && (
        <div className="p-2 border border-top-0 fw-light">
          Tareas pendientes: {counter}
        </div>
      )}
    </div>
  );
};

export default List;
