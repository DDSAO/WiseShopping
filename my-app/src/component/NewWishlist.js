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
        <div style={styleFrame}>
            <EditableTitle name={wishlist.name}/>
            {items ? Object.entries(items).map(([key, item], index) => {
                return <ItemCard 
                    key={key} index={index+1} iid={item.iid}
                    name={item.name}
                    onClickF={()=>{
                        dispatch(deleteItemInNew(item.iid))}}/>
            }) : null
            }
            <ItemAdder text="+ Add New Item" />
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
                        dispatch(jumpTo('home'))
                        history.push('/')
                    }}
                >Confirm</HoverBox>
            </div>
        </div>
    )
}

export default NewWishlist