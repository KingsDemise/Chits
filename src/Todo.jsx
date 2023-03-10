import React from 'react'
const style={
    li: `flex justify-between bg-[#ffe9ff] p-4 my-2 rounded-md`,
    row: `flex`,
    text: `text-white font-Montserrat ml-2 cursor-pointer`,
    button: `flex items-center`,
}

function Todo({todo}) {
  return (
    <li className={style.li}>
        <div className={style.row}>
            <p>
                {todo.text}
            </p>
        </div>
      
    </li>
  )
}

export default Todo
