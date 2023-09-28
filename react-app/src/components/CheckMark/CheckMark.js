import React from "react";
import './checkmark.css'
import checkmark from './checkmark.png'
function CheckMark(){
    return (
        <>
        <img className='check-mark' src={checkmark} alt="verified-check-mark"></img>
        </>
    )
}

export default CheckMark
