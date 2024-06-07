import React, { useEffect, useState } from "react";
import "./List.css";

const List = ({ tasks, setTasks }) => {
  const [counter, setCounter] = useState(tasks.length);

  useEffect(() => {
    setCounter(tasks.length);
  }, [tasks]);

  const checkTask = (idToCheck) => {
    const editTasks = tasks.map((task) => {
      if (task.id === idToCheck) {
        return { ...task, is_done: !task.is_done };
      }
      return task;
    });

    const taskToUpdate = tasks.find((task) => task.id === idToCheck);

    if (taskToUpdate) {
      fetch(`https://playground.4geeks.com/todo/todos/${idToCheck}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label: taskToUpdate.label,
          is_done: !taskToUpdate.is_done,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setTasks(editTasks);
    } else {
      console.error("Task not found");
    }
  };

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
              className={`list-group-item d-flex ${
                task.is_done ? "bg-success-subtle text-success-emphasis" : ""
              } justify-content-between align-items-center`}
            >
              {task.label}
              <div>
                <button
                  onClick={() => checkTask(task.id)}
                  className="btn btn-sm hidden-button"
                >
                  {task.is_done == false ? (
                    <i className="fa-regular fa-square-check fa-xl"></i>
                  ) : (
                    <i className="fa-solid fa-square-check fa-xl"></i>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-sm hidden-button"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
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
