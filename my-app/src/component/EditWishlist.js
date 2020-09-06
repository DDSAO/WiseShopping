import React, {useEffect} from 'react';
import HoverBox from './HoverBox';
import EditableTitle from './EditableTitle';
import { useSelector, useDispatch } from 'react-redux';
import { 
    createNewItemInEdit, 
    deleteItemInEdit, 
    showNotification, 
    hideNotification,
    clearDraft,
    jumpTo
} from '../redux/';

import ItemAdder from './ItemAdder';
import ItemCard from './ItemCard';

import { useHistory, useParams } from 'react-router-dom';
import { addWishlistFromDraft } from '../redux/';
import Empty from './Empty';
import { rerollChangeInEdit } from '../redux/wishlist/wishlistActions';



const styleFrame = {
    margin: "auto",
    height:"95%",
    width: "80%",
    borderLeft:"1px solid black",
    borderRight:"1px solid black",
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
}

const styleAddNew = {
    border: "1px solid black",
    borderRadius: "10px",
    width:"60%",
    height:"50px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
}

const styleAddNewHovered = {
    ...styleAddNew,
    background: "#DCDCDC"
}

const styleButtonFrame= {
    padding: "20px 8%",
    height:"90px",
    //marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}
const styleButton = {
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"1px solid black"
}
const styleButtonHovered = {
    ...styleButton,
    background: "#DCDCDC",
}


const EditWishlist = () => {
    let { wid } = useParams()
    const history = useHistory()
    const wishlist = useSelector(state => state.wishlist.wishlists[wid])
    const dispatch = useDispatch()

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
                dispatch(rerollChangeInEdit(wid))
                dispatch(hideNotification())
                history.push("/")
                dispatch(jumpTo('home'))
            },
            "yes",
            //confirm
            ()=>{
                dispatch(hideNotification())
                history.push("/")
                dispatch(jumpTo('home'))
            },)) 
    }
    return (
        <div style={styleFrame}>
            <EditableTitle name={wishlist.name}/>
            {wishlist.items ? Object.entries(wishlist.items).map(([key, item], index) => {
                return <ItemCard 
                    key={key} index={index+1} iid={item.iid} wid={wishlist.id}
                    name={item.name} usedIn="edit"
                    onClickF={()=>{
                        dispatch(deleteItemInEdit(wishlist.id, item.iid))}}/>
            }) : null
            }
            <ItemAdder text="+ Add New Item" usedIn="edit" wid={wid}/>
            <div style={styleButtonFrame}>
                <HoverBox
                    defaultStyle={styleButton}
                    hoveredStyle={styleButtonHovered}
                    onClickF={()=>handleCancel()}
                >Cancel</HoverBox>
                <HoverBox
                    defaultStyle={styleButton}
                    hoveredStyle={styleButtonHovered}
                    onClickF={()=>{
                        console.log('saved')
                        dispatch(addWishlistFromDraft())
                        history.push('/')
                        dispatch(jumpTo('home'))
                    }}
                >Confirm</HoverBox>
            </div>
        </div>
    )
}

export default EditWishlist