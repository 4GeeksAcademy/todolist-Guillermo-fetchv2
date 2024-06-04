import React, { useEffect, useState } from "react";
import List from "./List";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://playground.4geeks.com/todo/users/Guille", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        const taskData = data.todos.map((tarea) => ({
          id: tarea.id,
          label: tarea.label,
          is_done: tarea.is_done,
        }));
        setTasks(taskData);
        console.log(taskData)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      const newTask = {
        id: inputValue,
        label: inputValue,
        is_done: false,
      };
      setTasks([...tasks, newTask]);

      fetch("https://playground.4geeks.com/todo/todos/Guille", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ label: newTask.label, is_done: newTask.is_done }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === newTask.id ? { ...task, id: data.id } : task
            )
          );
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setInputValue("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center">ToDo List</h1>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="form-control rounded-0"
            type="text"
            placeholder="Introduce Tarea"
          />
          <List tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default Home;
