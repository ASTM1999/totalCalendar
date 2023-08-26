import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../atoms';

const EditTodo = ({ index }: { index: number }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [editedTodo, setEditedTodo] = useState(todoList[index]);

  const handleEditTodo = () => {
    if (editedTodo) {
      const updatedList = [...todoList];
      updatedList[index] = editedTodo;
      setTodoList(updatedList);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={editedTodo}
        onChange={(e) => setEditedTodo(e.target.value)}
      />
      <button onClick={handleEditTodo}>Save</button>
    </div>
  );
};

export default EditTodo;
