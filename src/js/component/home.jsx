import React, { useEffect, useState } from "react";
import List from "./List";
import CreateUser from "./CreateUser";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!userName) return;
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
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
        console.log("DataGet", data);
      })
      .catch((error) => {
        console.error("ErrorGet:", error);
      });
  }, [userName]);

  const handleInputChange = (event) => {
    if (userName === "") {
      alert("Select User Name");
      return;
    }
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

      fetch(`https://playground.4geeks.com/todo/todos/${userName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          label: newTask.label,
          is_done: newTask.is_done,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok POST" + response.statusText
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
          console.log("postSuccess:", data);
        })
        .catch((error) => {
          console.error("postError:", error);
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
      <CreateUser userName={userName} setUserName={setUserName} />
      <div className="row w-100 d-flex justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center">-ToDo List-{userName}</h1>
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
