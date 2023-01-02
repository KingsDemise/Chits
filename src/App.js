import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './Todo';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-br from-[#42275a] to-[#734b6d]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 bg-[#c397bc]`,
  heading: `text-5xl font-bold text-center text-gray-800 p-5`,
  form: `flex justify-between py-4 `,
  input: `border p-2 w-full text-xl`,
  button: `p-4 ml-2 bg-[#734b6d] text-slate-100 rounded-md`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //CRUD Here
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert("Can't add empty data");
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggled= async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteT= async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Chits</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type='text'
            placeholder='Add Stuff'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggled={toggled}
              deleteT={deleteT}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;