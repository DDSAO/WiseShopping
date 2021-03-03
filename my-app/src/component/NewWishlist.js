import React, {useEffect, useState, useRef} from 'react';
import HoverBox from './HoverBox';
import EditableTitle from './EditableTitle';
import { useSelector, useDispatch } from 'react-redux';
import { 
    createNewWishlist, 
    deleteItemInNew, 
    showNotification, 
    hideNotification,
    clearDraft,
    jumpTo,
    addWishlist,
} from '../redux/';

import ItemAdder from './ItemAdder';
import ItemCard from './ItemCard';
import { useHistory } from 'react-router-dom';


import { 
    styleButton, 
    styleButtonCancel, 
    styleButtonConfirm
 } from '../css/css';

import Background from '../asset/background.jpg'
import VirtualItemCard from './VirtualItemCard';


const styleBackground = {
    background: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

const styleFrame = {
    margin: "auto",
    position:"relative",
    top:"5%",
    height:"95%",
    width: "80%",
    //borderLeft:"1px solid black",
    //borderRight:"1px solid black",
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backdropFilter: "blur(50px) brightness(120%)",
}
const styleItemBox = {
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow:"scroll",
}


const styleButtonFrame= {
    padding: "20px 8%",
    height:"90px",
    //marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
}

const styleButtonHovered = {
    ...styleButton,
    background:"rgba(255,255,255,0.5)",
}


const NewWishlist = () => {
    const wishlist = useSelector(state => state.wishlist.newWishlist)
    const user = useSelector(state=> state.interface.user)
    const history = useHistory()
    const dispatch = useDispatch()

    const [isAddingHovered, setAddingHovered] = useState(false)
    const [currentAddingText, setAddingText] = useState(false)

    const itemBoxRef = useRef(null)

    useEffect(()=>{
            if (wishlist.id === undefined) {
                dispatch(createNewWishlist())
            }
        }, [])

    //scroll down pages when inserted or deleted
    useEffect(()=> {
        itemBoxRef.current.scrollTop = itemBoxRef.current.scrollHeight
    }, [wishlist.items])

    const handleCancel = () => {
        dispatch(showNotification(
            ("Do you want to save this wishlist as draft?")
            ,
            "no",
            //onCancel
            ()=>{
                dispatch(clearDraft())
                dispatch(hideNotification())
                dispatch(jumpTo('home'))
                history.push("/")
            },
            "yes",
            //confirm
            ()=>{
                dispatch(hideNotification())
                dispatch(jumpTo('home'))
                history.push("/")
            },
        )) 
    }

    return (
        <div style={styleBackground}>
            <div style={styleFrame}>
                <EditableTitle name={wishlist.name}/>
                <div ref={itemBoxRef} style={styleItemBox}>
                    {wishlist.items ? Object.entries(wishlist.items).map(([key, item], index) => {
                        return <ItemCard 
                            key={key} index={index+1} iid={item.iid} wid={wishlist.id}
                            name={item.name} 
                            onClickF={()=>{
                                dispatch(deleteItemInNew(item.iid))}}/>
                    }) : null
                    }

                    {isAddingHovered ? 
                        <VirtualItemCard 
                            text={currentAddingText} 
                            index={Object.keys(wishlist.items).length + 1}/>
                        : null}
                </div>
                <ItemAdder 
                    text="+ Add New Item" 
                    setHovered = {setAddingHovered}
                    setText = {setAddingText}
                />
                    
                
                <div style={styleButtonFrame}>
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonCancel}
                        onClickF={()=>handleCancel()}
                    >Cancel</HoverBox>
                    <HoverBox
                        defaultStyle={styleButton}
                        hoveredStyle={styleButtonConfirm}
                        onClickF={()=>{
                            dispatch(addWishlist(user.id, wishlist))
                            dispatch(jumpTo('home'))
                            history.push('/')
                        }}
                    >Confirm</HoverBox>
                </div>
            </div>
            
        </div>
    )
}

export default NewWishlist