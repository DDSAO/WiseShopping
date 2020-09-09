import React, { useState, useRef, useEffect } from 'react';
import HoverBox from './HoverBox';

import CheckIcon from '@material-ui/icons/Check';
import { useDispatch } from 'react-redux';
import { createNewItemInNew, createNewItemInEdit } from '../redux';
import { JADE_GREEN } from '../css/colors';


const styleFrame = {
    width: "60%",
    height: "40px",
    margin: "auto",
    display:"flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    borderRadius: "5px",
    border: "1px solid black",
}
const styleHovered = {
    ...styleFrame,
    background: JADE_GREEN,
    
}
const styleText = {
    borderRadius: "15px",
    padding: "0 20px",
    fontSize: "20px",
    userSelect: "none",
}

const styleInput = {
    padding:"0 10px",
    width: "100%",
    border:"none",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    borderRadius: "5px",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",
    height: "100%",
}
const styleButton = {
    //border: "1px solid black",
    borderRadius: "5px",
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    height: "100%",
    width: "50px",
    padding: "1px",
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#EEEEEE",
    fill:"red",
}
const styleButtonHovered = {
    ...styleButton,
    background: JADE_GREEN
}
const styleIconDisabled = {
    fill: "grey",
}
const styleIcon = {
    fill: "black",
}

const defaultStyle= {
    display: {
        default: styleFrame,
        hovered: styleHovered,
        text: styleText,
    }, 
    edit: {
        frame: styleFrame,
        input: styleInput,
        button: styleButton,
        buttonHovered: styleButtonHovered
    }
}
const Text = (props) => {
    return (
        <HoverBox 
            defaultStyle={props.style.default}
            hoveredStyle={props.style.hovered}
            onClickF={props.onClickF}
            onMouseEnterF = {() => props.setHovered(true)}
            onMouseLeaveF = {() => props.setHovered(false)}
        >
            <p style={props.style.text}>{props.text}</p>
        </HoverBox>
    )
}
const EditText = (props) => {

    return (
        <div style={props.style.frame}>
            <input 
                ref = {props.inputRef}
                style={props.style.input} 
                type="text" 
                placeholder={"+ Add New Item"} 
                onChange={props.onChangeF} 
                autoFocus></input>
            <HoverBox 
                defaultStyle={props.style.button}
                hoveredStyle={props.style.buttonHovered} 
                onClickF={props.onClickF}>
                <CheckIcon style={props.enableButton ? styleIcon : styleIconDisabled}/>
            </HoverBox>
        </div>
    )
}

const ItemAdder = (props) => {
    const [currentText, changeText] = useState("")
    const [displayMode, changeMode] = useState(1)
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    let style = defaultStyle
    if (props.style) {
        style = props.style
    } 
    let addItem;

    const addEnterListener = e => {
        if (e.key === "Enter") {
            addItem()    
        } 
    }

    const detectClickOutside = (e)=> {
        if (! inputRef.current.contains(e.target)) {
            changeText("")
            changeMode(1)
        }
    }
    //usedIn determines which reducer to call
    //draft for draft wishlist, edit for change existed wishlist
    useEffect(()=>{
        if (! displayMode) {
            addItem = () => {
                if (inputRef.current.value === "") {
                    inputRef.current.placeholder = "Please input an item"
                    alert("Item name cannot be empty :<")
                } else {
                    changeText("")
                    inputRef.current.value = ""
                    props.usedIn === "edit" ? 
                        dispatch(createNewItemInEdit(props.wid, currentText)) :
                        dispatch(createNewItemInNew(currentText))
                }
            }
            document.addEventListener("keypress" , addEnterListener)
            document.addEventListener("click", detectClickOutside)
            return () =>{
                document.removeEventListener("keypress", addEnterListener)
                document.removeEventListener("click", detectClickOutside)
            }
        }
    }, [displayMode, currentText])

    return (
        <div style={{height:"fit-content",marginTop:"auto"}}>
            {displayMode ? 
            <Text 
                {...props}
                style={style.display}
                text={"+ Add New Item"}
                onClickF={()=>changeMode(1-displayMode)}
            /> :
            <EditText
                style={style.edit}
                onChangeF={e=> {
                    changeText(e.target.value)
                    props.setText(e.target.value)
                }}
                onClickF={()=> addItem()}
                inputRef = {inputRef}
                enableButton = {currentText.length}
            />
            }
        </div>
    )
}

export default ItemAdder