import React, {useEffect} from 'react';
import HoverBox from './HoverBox';
import EditableTitle from './EditableTitle';
import { useSelector, useDispatch } from 'react-redux';
import { 
    createNewWishlist, 
    createNewItemInNew, 
    deleteItemInNew, 
    showNotification, 
    hideNotification,
    clearDraft,
    jumpTo
} from '../redux/';

import ItemAdder from './ItemAdder';
import ItemCard from './ItemCard';
import { useHistory } from 'react-router-dom';
import { addWishlistFromDraft } from '../redux/';

import { 

    styleButton, 
    styleButtonCancel, 
    styleButtonConfirm
 } from '../css/css';

import Background from '../asset/background.jpg'



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
    const dispatch = useDispatch()
    var wishlist = useSelector(state => state.wishlist.newWishlist)
    var items = useSelector(state => state.wishlist.newWishlist.items)
    const history = useHistory()

    useEffect(()=>{
        if (wishlist.id === undefined) {
            dispatch(createNewWishlist())
        }
    }, [])

    const handleCancel = () => {
        dispatch(showNotification(
            (<div>
                <p>Do you want to save this wishlist as draft?</p>
                <p>(Next time you create new wishlist, current items will be displayed)</p>
            </div>)
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
                <div style={styleItemBox}>
                    {items ? Object.entries(items).map(([key, item], index) => {
                            return <ItemCard 
                                key={key} index={index+1} iid={item.iid}
                                name={item.name}
                                onClickF={()=>{
                                    dispatch(deleteItemInNew(item.iid))}}/>
                    }) : null
                    }
                </div>
                    
                <ItemAdder text="+ Add New Item" />
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
                            console.log('saved')
                            dispatch(addWishlistFromDraft())
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