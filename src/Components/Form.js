import { useState } from "react";
import { useEffect } from "react";
import { FORM_MODE } from "../utils/constants.js";

const Form = ({ initialValues, onAddTodo, updateTask }) => {
  const [formMode, setFormMode] = useState(FORM_MODE.CREATE);
  const [todo, setTodo] = useState([]);
  const initialState = {task: ""};
  useEffect(() => {
    const hasInitialValues =
      initialValues.id &&
      initialValues.task
    if (hasInitialValues) {
      console.log(initialValues);
      setTodo(initialValues);
      setFormMode(FORM_MODE.EDIT);
    } else {
      setFormMode(FORM_MODE.CREATE);
    }
  }, [initialValues]);
  const inputTextHandler = (e) => {
    const inputText = e.target.value;
    setTodo({ ...todo, task: inputText, isCompleted: false, color: "default" });
  };
  const onSubmitTodoHandler = (e) => {
    e.preventDefault();

    if (formMode === FORM_MODE.CREATE) {
      onAddTodo(todo);
    }
    if (formMode === FORM_MODE.EDIT) {
      updateTask(todo);
    }
    setTodo({...initialState});
    setFormMode(FORM_MODE.CREATE);
  };
  return (
    <form className="my-form" onSubmit={onSubmitTodoHandler}>
      <input
        type="text"
        value={todo.task}
        placeholder="New Task"
        onChange={inputTextHandler}
      />
      <button className="btn" type="submit">
        {formMode === FORM_MODE.CREATE ? "Add" : "Update"}
      </button>
    </form>
  );
};

export default Form;