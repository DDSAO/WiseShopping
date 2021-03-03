import React, {useState, useEffect, useRef} from 'react';
import { useDispatch} from 'react-redux';
import { changeItemNameInDraft, changeItemNameInEdit } from '../redux/wishlist/wishlistActions';
import { gsap } from 'gsap';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { LIGHT_RED, LIGHT_BLUE, DEEP_BLUE } from '../css/colors';

import EditIcon from '@material-ui/icons/Edit';
import { flexCenter, styleIcon } from '../css/css';


const styleCard = {
    ...flexCenter,
    marginTop: "10px",
    width: "60%",
    height: "40px",
    background: "rgba(255,255,255,0.2)"
}
const styleCardDeleting = {
    ...styleCard,
    background: LIGHT_RED,
}
const styleIndex = {
    ...flexCenter,
    width: "30px",
}
const styleLabel = {
    ...flexCenter,
    textAlign:"center",
    margin:"0 20px",
    overflow: "hidden",
}

const styleLabelHovered = {
    ...styleLabel,
    background: LIGHT_BLUE,
}
const styleText = {
    ...flexCenter,
    position: "relative",
    left: "15px",
}
const styleEditIcon = {
    ...flexCenter,
    position: "relative",
    width: "30px",
    height: "30px",
    left: "0px",
    top:"30px",
}

const styleIconHovered = {
    ...styleIcon,
}
const styleInputFrame = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin:"0 20px",
}
const styleInput = {
    height:"36px",
    width:"100%",
    textAlign: "center",
    border: "none",
    fontSize: "1em",
}

const Text = (props) => {
    /*
    return (
        <HoverBox 
            defaultStyle={styleLabel}
            hoveredStyle={styleLabelHovered}
            onClickF={props.onClickF}
        >
            {props.name}
        </HoverBox>
    )
    */
    const [isHovered, setHovered] = useState(false)
    const iconRef = useRef(null)
    const t1 = useRef(null)

    useEffect(()=> {
        t1.current = gsap.timeline({paused:true})
            .fromTo(iconRef.current, 0.2, {css:{top:"30px"}}, {css:{top:"0px"}})
            
    }, [])
    return (
    <div
        onMouseEnter = {()=> {
            setHovered(true)
            if (t1.current) {
                t1.current.play()
            } 
        }}
        onMouseLeave = {()=> {
            setHovered(false)
            if (t1.current) {
                t1.current.reverse()
            }        
        }}
        style={isHovered ? styleLabelHovered : styleLabel}
    >
        <div style={styleText}>{props.name}</div>
        <div ref = {iconRef} style={styleEditIcon}>
            <EditIcon style={{fill: DEEP_BLUE, fontSize:"small", overflow:"hidden"}}/>
        </div>
    </div>)
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
    const [isDeleteHovered, setDeleteHovered] = useState(false)
    const inputRef = useRef(null)
    const deleteRef = useRef(null)
    const deleteRotate = useRef(null)
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

 
    useEffect(()=> {
        deleteRotate.current = gsap.timeline({paused:true, repeat:-1})
        .to(deleteRef.current, 0.08, {
            rotation: 20,
            transformOrigin: "50% 50%",
            ease: "none",
        })
        .to(deleteRef.current, 0.16, {
            rotation: -20,
            transformOrigin: "50% 50%",
            ease: "none",
        })
        .to(deleteRef.current, 0.08, {
            rotation: 0,
            transformOrigin: "50% 50%",
            ease: "none",
        })
    }, [])

    useEffect(()=> {
        if (isDeleteHovered) {
            deleteRotate.current.play()
        } else {
            deleteRotate.current.restart().pause()
        }
    }, [isDeleteHovered])


    useEffect(()=>{
        if (! isDisplaying) {
            addItem = props.usedIn === "edit" ? 
                () => dispatch(changeItemNameInEdit(props.wid, props.iid, currentText)) :
                () => dispatch(changeItemNameInDraft(props.iid, currentText))
            document.addEventListener("keypress" , addEnterListener)
            document.addEventListener("click", detectClickOutside)
            return () => {
                document.removeEventListener("keypress", addEnterListener)
                document.removeEventListener("click", detectClickOutside)
            }
        }
    }, [isDisplaying, currentText])


    return (
        <div style={isDeleteHovered? styleCardDeleting: styleCard}>
            
            <div 
                style={styleLabel}
                onClick={()=>{setDisplaying(false)}}
            >
                <div style={styleIndex}>{props.index}.  </div>
                {isDisplaying ? 
                    <Text name={currentText} index={props.index} onClickF={()=>{setDisplaying(false)}}/> : 
                    <EditText 
                        inputRef={inputRef} placeholder={currentText}
                        onChangeF={e=>{
                            setText(e.target.value)
                        }}
                    />
                }
                <div 
                    ref = {deleteRef}
                    style={isDeleteHovered ? styleIconHovered : styleIcon}
                    onMouseEnter={()=>setDeleteHovered(true)}
                    onMouseLeave={()=>setDeleteHovered(false)}
                    onClick={props.onClickF}
                ><DeleteOutlineIcon style={{fill:"tomato"}}/></div>
            </div>
        </div>
    )
}

export default ItemCard