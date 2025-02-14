import { useState, useEffect } from "react";
import TaskItem from "../TaskItem.js";
import axios from "axios";
import "./index.css";

const TaskForm = () => {
  const [todosList, addTodoItemToList] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      console.log(res.data);
      addTodoItemToList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/todos/${id}`);
      console.log(res.data);
      addTodoItemToList((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/todos`, {
        newTodoTitle,
      });
      console.log(res.data);
      const newTodo = {
        id: res.data.id,
        title: res.data.newTodoTitle,
      };
      addTodoItemToList((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoTitle("");
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  const changeInMainList = async (id, todoTitle) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        todoTitle,
      });

      addTodoItemToList((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: res.data.todoTitle } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="inner-container">
        <h1 className="heading">Simple Todos</h1>
        <div className="add-todo">
          <input
            type="text"
            name="newTodoTitle"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter todo title"
          />
          <button onClick={addTodo} type="button">
            Add
          </button>
        </div>
        <ul className="todos-list">
          {todosList.map((todo) => (
            <TaskItem
              key={todo.id}
              todoDetails={todo}
              deleteTodo={deleteTodo}
              changeInMainList={changeInMainList}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskForm;
