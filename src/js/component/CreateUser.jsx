import React, { useEffect, useState } from "react";

const CreateUser = ({ setUserName, userName = undefined }) => {
  const [newUserName, setNewUserName] = useState("");
  const handleUserChange = (event) => {
    setNewUserName(event.target.value);
  };
  const selectUserName = (e) => {
    if (e.key === "Enter") {
      setUserName(newUserName);
    }
  };

  useEffect(() => {
    if (!userName) return;
    console.log(userName);
    fetch(`https://playground.4geeks.com/todo/users/${userName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => {
        console.log("responsePOSTUser", response);
        return response.json();
      })
      .then((data) => {
        console.log("SuccessPOSTUser:", data.detail);
        if (data.detail === "User already exists.") {
          alert(`User ${userName} already exists, loading pending tasks.`);
        }
      })
      .catch((error) => {
        console.error("ErrorPOSTUser:", error);
      });
  }, [userName]);

  return (
    <div className="form-floating mb-3">
      <input
        type="text"
        className="form-control"
        id="floatingInput"
        placeholder="User Name"
        onChange={handleUserChange}
        value={newUserName}
        onKeyDown={selectUserName}
      />
      <label htmlFor="floatingInput">User name</label>
    </div>
  );
};

export default CreateUser;
