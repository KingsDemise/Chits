import React from 'react'
import {ImCross} from "react-icons/im"
const style={
    li: `flex justify-between bg-[#ffe9ff] p-4 my-2 capitalize rounded-md`,
    row: `flex`,
    text: `text-white font-Montserrat ml-2 cursor-pointer`,
    button: `flex items-center`,
}

function Todo({todo,deleteT}) {
  return (
    <li className={style.li}>
        <div className={style.row}>
            <p>
                {todo.text}
            </p>
        </div>
        <button onClick={() => deleteT(todo.id)}><ImCross/></button>
      
    </li>
  )
}

export default Todo
