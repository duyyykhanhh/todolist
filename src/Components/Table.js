import { v4 as uuidv4 } from "uuid";
import Form from "./Form.js";
import TaskList from "./TaskList.js";
import { useState } from "react";
import { FILTER_OPTIONS } from "../utils/constants.js";

const Table = () => {
  const [todoList, setTodoList] = useState([]);
  const [editingTodo, setEditingTodo] = useState({});
  const [todoStatus, setTodoStatus] = useState(FILTER_OPTIONS.DEFAULT);
  const onAddNewTodoHandler = (todo) => {
    const newTodo = { ...todo, id: uuidv4() };
    setTodoList([...todoList, newTodo]);
  };
  const onOpenUpdateTaskHandler = (id) => {
    // filter ra todo cần sửa
    const existingTodos = todoList.find((todo) => todo.id === id);
    if (!existingTodos) return;
    else {
      setEditingTodo(existingTodos);
    }
  };
  const updateTask = (updatedTodo) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo;
        } else return todo;
      })
    );
    setEditingTodo({});
  };
  const onRemoveTaskHandler = (id) => {
    const filteredTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(filteredTodos);
  };
  const onUpdateSttHandler = (id) => {
    const clickedTodo = todoList.find((todo) => todo.id === id);
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === clickedTodo.id) {
          return { ...clickedTodo, isCompleted: !clickedTodo.isCompleted };
        } else return todo;
      })
    );
  };
  const sortTodoList = (todoList, todoStatus) => {
    let sortedTodoList = [...todoList];
    switch (todoStatus) {
      case FILTER_OPTIONS.COMPLETED:
        // eslint-disable-next-line no-lone-blocks
        {
          sortedTodoList = todoList.filter(
            (todo) => todo.isCompleted
          );
        }
        break;
      case FILTER_OPTIONS.UNCOMPLETED:
        // eslint-disable-next-line no-lone-blocks
        {
          sortedTodoList = todoList.filter(
            (todo) => !todo.isCompleted
          );
        }
        break;
      case FILTER_OPTIONS.DEFAULT:
      default:
        return sortedTodoList;
    }
    return sortedTodoList;
  };
  const sortedTodoListValues = sortTodoList(todoList, todoStatus);

  return (
    <div className="container">
      <Form
        className="my-form"
        todoList={todoList}
        setTodoList={setTodoList}
        onAddTodo={onAddNewTodoHandler}
        initialValues={editingTodo}
        updateTask={updateTask}
      />
      <div className="stt-container">
        <button
          className={"btn stt " + (todoStatus === FILTER_OPTIONS.DEFAULT ? "active" : "")}
          onClick={() => setTodoStatus(FILTER_OPTIONS.DEFAULT)}
        >
          All
        </button>
        <button
          className={"btn stt " + (todoStatus === FILTER_OPTIONS.COMPLETED ? "active" : "")}
          onClick={() => setTodoStatus(FILTER_OPTIONS.COMPLETED)}
        >
          Completed
        </button>
        <button
          className={"btn stt " + (todoStatus === FILTER_OPTIONS.UNCOMPLETED ? "active" : "")}
          onClick={() => setTodoStatus(FILTER_OPTIONS.UNCOMPLETED)}
        >
          Uncompleted
        </button>
      </div>
      <TaskList
        todoList={sortedTodoListValues}
        setTodoList={setTodoList}
        onRemoveTaskHandler={onRemoveTaskHandler}
        onOpenUpdateTaskHandler={onOpenUpdateTaskHandler}
        onUpdateSttHandler={onUpdateSttHandler}
      />
    </div>
  );
};

export default Table;