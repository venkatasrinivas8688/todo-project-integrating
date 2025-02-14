// Write your code here
import { useState } from "react";

import "./index.css";

const TaskItem = (props) => {
  const { todoDetails, deleteTodo, changeInMainList } = props;

  const [editing, handleEditing] = useState(false);
  const [updatedTitle, handleChangeTitle] = useState("");

  const handleEditBtn = () => {
    handleEditing(true);
    handleChangeTitle(todoDetails.title);
  };

  const handleSaveBtn = () => {
    handleEditing(false);
    changeInMainList(todoDetails.id, updatedTitle);
  };

  const handleChangeBtn = (e) => {
    handleChangeTitle(e.target.value);
  };

  return (
    <li className="todo-item">
      {editing ? (
        <>
          <input
            type="text"
            className="input-element"
            value={updatedTitle}
            onChange={handleChangeBtn}
            placeholder="Enter the todo"
          />
          <button onClick={handleSaveBtn} className="save-btn" type="button">
            Save
          </button>
        </>
      ) : (
        <div className="item-container">
          <p className="title">{todoDetails.title}</p>

          <div className="buttons-container">
            <button onClick={handleEditBtn} type="button" className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todoDetails.id)}
              type="button"
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
