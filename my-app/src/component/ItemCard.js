import React, {useState, useEffect, useRef} from 'react';
import HoverBox from './HoverBox';
import { useDispatch, useSelector } from 'react-redux';
import { changeItemNameInDraft, changeItemNameInEdit } from '../redux/wishlist/wishlistActions';


const styleCard = {
    width: "60%",
    height: "40px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

}
const styleLabel = {
    display: "flex",
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems: "center",
    padding: "0px 10px",
    borderRadius: "10px",
    height:"30px",
}
const styleLabelHovered = {
    ...styleLabel,
    background: "#EEEEEE",
}
const styleIcon = {
    height: "30px",
    width: "30px",
    borderRadius:"10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
}
const styleIconHovered = {
    ...styleIcon,
    background: "#DCDCDC",
}
const styleInputFrame = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}
const styleInput = {
    marginLeft: "10px",
}

const Text = (props) => {
    return (
        <HoverBox 
            defaultStyle={styleLabel}
            hoveredStyle={styleLabelHovered}
            onClickF={props.onClickF}
        >
            {props.name}
        </HoverBox>
    )
}
const EditText = (props) => {

    return (
        <div style={styleInputFrame}>
            <input 
                ref = {props.inputRef}
                style={styleInput} 
                type="text" 
                placeholder={props.placeholder} 
                onChange={props.onChangeF} 
                autoFocus></input>
        </div>
    )
}

const ItemCard = (props) => {
    const [isDisplaying, setDisplaying] = useState(true)
    const [currentText, setText] = useState(props.name)
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    let addItem;

    const addEnterListener = e => {
        if (e.key === "Enter") {
            if (inputRef.current.value === "") {
                inputRef.current.placeholder = "Please input an item"
                alert("Item name cannot be empty :<")
            } else {
                addItem()
                setDisplaying(true)
            }
            
        } 
    }

    const detectClickOutside = (e)=> {
        if (! inputRef.current.contains(e.target)) {
            addItem()
            setDisplaying(true)
        }
    }


    useEffect(()=>{
        if (! isDisplaying) {
            addItem = props.usedIn === "edit" ? 
                () => dispatch(changeItemNameInEdit(props.wid, props.iid, currentText)) :
                () => dispatch(changeItemNameInDraft(props.iid, currentText))
            document.addEventListener("keypress" , addEnterListener)
            document.addEventListener("click", detectClickOutside)
            return () =>{
                document.removeEventListener("keypress", addEnterListener)
                document.removeEventListener("click", detectClickOutside)
            }
        }
    }, [isDisplaying, currentText])


    return (
        <div style={styleCard}>
            <div 
                style={styleLabel}
                onClick={()=>{setDisplaying(false)}}
            >
                {props.index}.  
                {isDisplaying ? 
                    <Text name={currentText} index={props.index} onClickF={()=>{setDisplaying(false)}}/> : 
                    <EditText 
                        inputRef={inputRef} placeholder={currentText}
                        onChangeF={e=>setText(e.target.value)}
                    />
                }
            <HoverBox 
                defaultStyle={styleIcon} 
                hoveredStyle={styleIconHovered}
                onClickF={props.onClickF}
            >❌</HoverBox>
        </div>
        </div>
    )
}

export default ItemCard