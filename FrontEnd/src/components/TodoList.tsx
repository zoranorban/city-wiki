import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { UserContext } from "../context/UserContext";
import TextField from "./TextField";
import Button from "./Button/Button";

interface TodoListItem {
  id: string;
  text: string;
  isDone: boolean;
}

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);
  const [textValue, setTextValue] = useState<string>("");

  const { isLoggedIn } = useContext(UserContext);

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setTextValue(value);
  };

  const handleAddButtonClick = () => {
    const id = uuidv4();

    setTodoList([
      ...todoList,
      {
        id,
        text: textValue,
        isDone: false,
      },
    ]);
  };

  const handleDeleteButtonClick = (id: string) => {
    setTodoList(todoList.filter((item) => id !== item.id));
  };

  const handleCheckboxCheck = (id: string) => {
    setTodoList(
      todoList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          };
        }
        return item;
      })
    );
  };

  console.log({ isLoggedIn });

  return (
    <div>
      <TextField onChange={handleInputChange} label="My todos:" />
      <Button onClick={handleAddButtonClick}>Add to do</Button>
      <ul>
        {todoList.map((listItem) => {
          return (
            <li key={listItem.id}>
              <input
                type="checkbox"
                onChange={() => handleCheckboxCheck(listItem.id)}
              />
              {listItem.text}
              <Button onClick={() => handleDeleteButtonClick(listItem.id)}>
                x
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
