import React from 'react'
import './ButtonIcons.css'
import { AiFillDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";

function ButtonIcons({removeTask, rewriteHomework, cancel}) {
    return (

        <div className='container-icons'>

            <div className='icono-remove'
                onClick={removeTask}>
                <AiFillDelete />
            </div>

            <div className='icono-task'
                onClick={rewriteHomework}>
                <BsPencilSquare />
            </div>

            <div className='cancel'
                onClick={cancel}>
                Cancel
            </div>

        </div>

    )
}

export default ButtonIcons