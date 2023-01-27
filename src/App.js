import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { db } from './firebase';
import {
  query,
  collection,
  onSnapshot
} from 'firebase/firestore';
import { Link } from 'react-router-dom';

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

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Chits</h3>
        <p style={{textAlign:"center"}}>
            <Link to="/login" >Admin Login</Link>
        </p>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;