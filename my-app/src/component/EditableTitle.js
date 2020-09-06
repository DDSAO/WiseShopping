import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { saveDraftTitle } from '../redux'


const style = {
    width: "fit-content",
    height: "50px",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    borderLeft: "5px solid black",
    borderRight: "5px solid black",
    margin: "10px",
    padding: "0 5px", 
}
const styleTextBox = {
    width:"200px",
    padding: "0 20px",
    borderRadius: "5px",
    display: "flex",
    justifyContent : "center",
    alignItems : "center,"
}
const styleTextBoxHovered = {
    ...styleTextBox,
    background: "#DCDCDC",
}
const styleText = {
    fontSize:"1em",
    userSelect: "none",
}
const styleInput = {
    height: "50px",
    width: "200px",
    border: "none",
    borderBottom: "1px solid black",
    textAlign: "center",
    fontSize:"1em",
}
const Text = (props) => {
    return (
        <div style={props.currentStyle}>
            <p style={styleText}>{props.text}</p>
        </div>
    )
}
const Input = (props) => {
    return (
        <input 
            ref={props.inputRef} 
            onChange={props.onChangeF}
            style={styleInput}
            placeholder={props.placeholder}
        ></input>
    )
}

const EditableTitle = (props) => {
    const [isHovered, setHovered] = useState(false)
    const [isDisplaying, setDisplaying] = useState(true)
    const [currentText, setText] = useState(props.name)
    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const detectClickOutside = (e)=> {
        if (! inputRef.current.contains(e.target)) {
            setDisplaying(true)
            
        }
    }
    const detectEnter = (e) => {
        if (e.key === "Enter") {
            setDisplaying(true)
        }
    }
    useEffect(()=> {
        setText(props.name)
    }, [props.name])

    useEffect(()=> {
        if (! isDisplaying) {
            inputRef.current.focus()
            document.addEventListener('keypress', detectEnter)
            document.addEventListener('mousedown', detectClickOutside)
        }
        return () => {
            if (! isDisplaying) {
                document.removeEventListener('keypress', detectEnter)
                document.removeEventListener('mousedown', detectClickOutside)
            }
        }
    },[isDisplaying])

    return (
        <div
            style={style}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={()=> {
                if (isDisplaying === true) {
                    setDisplaying(false)
                }
            }}
        >
        {isDisplaying ? 
            <Text 
                currentStyle={isHovered ? styleTextBoxHovered : styleTextBox} 
                text={isHovered ? "Click to edit title" : currentText}
            /> : 
            <Input 
                inputRef={inputRef}
                onChangeF={(e)=>{
                    setText(e.target.value)
                    dispatch(saveDraftTitle(e.target.value))
                }}
                placeholder={currentText}
            />
        }  
        </div>
    )
}

export default EditableTitle;