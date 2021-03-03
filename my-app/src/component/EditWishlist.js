import React, {useEffect, useState, useRef} from 'react';
import HoverBox from './HoverBox';
import EditableTitle from './EditableTitle';
import { useSelector, useDispatch } from 'react-redux';
import { 
    deleteItemInEdit, 
    showNotification, 
    hideNotification,
    jumpTo,
    uploadEdittedWishlist
} from '../redux/';

import ItemAdder from './ItemAdder';
import ItemCard from './ItemCard';

import { useHistory, useParams } from 'react-router-dom';
import Empty from './Empty';


import Background from '../asset/background.jpg'
import { styleButton, styleButtonConfirm, styleButtonCancel } from '../css/css';
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


const EditWishlist = () => {
    let { wid } = useParams()
    const history = useHistory()
    const wishlist = useSelector(state => state.wishlist.wishlists[wid])
    const user = useSelector(state=> state.interface.user)
    const dispatch = useDispatch()

    const [isAddingHovered, setAddingHovered] = useState(false)
    const [currentAddingText, setAddingText] = useState(false)

    const itemBoxRef = useRef(null)

    //scroll down pages when inserted or deleted
    useEffect(()=> {
        if (wishlist.items) itemBoxRef.current.scrollTop = itemBoxRef.current.scrollHeight
    }, [wishlist.items])

    if (wishlist === undefined) {
        return <Empty message="No wishlist found"/>
    }

    

    const handleCancel = () => {
        dispatch(showNotification(
            (<div>
                <p>Do you want to save the changes you made ?</p>
            </div>)
            ,
            "no",
            //onCancel
            ()=>{
                //dispatch(rerollChangeInEdit(wid))
                dispatch(hideNotification())
                history.push("/")
                dispatch(jumpTo('home'))
            },
            "yes",
            //confirm
            ()=>{
                dispatch(uploadEdittedWishlist(user.id, wid, wishlist))
                history.push('/')
                dispatch(jumpTo('home'))
                dispatch(hideNotification())
            })) 
    }
    return (
        <div style={styleBackground}>
            <div style={styleFrame}>
                <EditableTitle name={wishlist.name}/>
                <div ref={itemBoxRef} style={styleItemBox}>
                    {wishlist.items ? Object.entries(wishlist.items).map(([key, item], index) => {
                        return <ItemCard 
                            key={key} index={index+1} iid={item.iid} wid={wishlist.wid}
                            name={item.name} usedIn="edit"
                            onClickF={()=>{
                                dispatch(deleteItemInEdit(wishlist.wid, item.iid))}}/>
                    }) : null
                    }
                    {isAddingHovered ? 
                        <VirtualItemCard 
                            text={currentAddingText} 
                            index={wishlist.items ? (Object.keys(wishlist.items).length + 1) : 1}/>
                        : null}
                </div>
                <ItemAdder 
                    text="+ Add New Item" usedIn="edit" wid={wid}
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
                            dispatch(uploadEdittedWishlist(user.id, wid, wishlist))
                            history.push('/')
                            dispatch(jumpTo('home'))
                        }}
                    >Confirm</HoverBox>
                </div>
            </div>
        </div>
    )
}

export default EditWishlist