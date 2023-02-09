import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import {AiOutlineClose} from 'react-icons/ai'
export default function Messages() {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.messages)


    const dismisError = (id) => {
        dispatch({
          type: "messages/REMOVE_MESSAGE",
          payload: {
            id,
          },
        });
      };
  return (
    <>
         {messages.map((message) => (
        <div
          key={message.id}
          className={`alert alert-${message.type} w-sm-25 mx-auto d-flex align-items-center justify-content-between message`}
        >
          <span>{message.title}</span>
          <AiOutlineClose
            onClick={() => dismisError(message.id)}
            className="pointerCursor"
          />
        </div>
      ))}
    </>
  )
}
