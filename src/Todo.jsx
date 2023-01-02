import React from 'react'
import {ImCross} from "react-icons/im"
const style={
    li: `flex justify-between bg-[#734b6d] p-4 my-2 capitalize rounded-md`,
    liComplete: `flex justify-between bg-[#42275a] p-4 my-2 capitalize rounded-md`,
    row: `flex`,
    text: `text-white font-Montserrat ml-2 cursor-pointer`,
    textComplete: `text-white font-Montserrat ml-2 cursor-pointer line-through`,
    button: `flex items-center`,
}

function Todo({todo,toggled,deleteT}) {
  return (
    <li className={todo.completed?style.liComplete:style.li}>
        <div className={style.row}>
        <input onChange={() => toggled(todo)} type='checkbox' checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggled(todo)} className={todo.completed ? style.textComplete : style.text}>
                {todo.text}
            </p>
        </div>
        <button onClick={() => deleteT(todo.id)}><ImCross/></button>
      
    </li>
  )
}

export default Todo
