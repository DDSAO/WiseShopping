import React from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import ViewItemCard from './ViewItemCard';
import Empty from './Empty';
import HoverBox from './HoverBox';

import { 
    showNotification, 
    hideNotification,
    jumpTo,
    uploadEdittedWishlist,
    saveAsPast, 
    uploadNotifications
} from '../redux/';

import Background from '../asset/background.jpg'

//css
import { styleButton, styleButtonCancel, styleButtonConfirm } from '../css/css';

const styleBackground = {
    background: `url(${Background})`,
    backgroundSize: "cover",    
    backgroundPosition: "center",
}

const styleFrame = {
    margin: "auto",
    position: "relative",
    top:"5%",
    height:"95%",
    width: "80%",
    borderLeft:"1px solid black",
    borderRight:"1px solid black",
    display:"flex",
    flexDirection: "column",
    backdropFilter: "blur(50px) brightness(120%)",
    
}

const styleTitleFrame = {
    height: "100px",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent:"center"
}
const styleCardFrame = {
    height: "auto",
    display:"flex",
    flexDirection: "column",
    justifyContent:"flex-start",
    alignItems:"center",

    overflow: "scroll",
}

const styleTitle = {
    width: "70%",
    paddingLeft: "5%",
    fontSize: "40px",
    display:"flex",
    alignItems: "center"
}
const styleDate = {
    width:"30%",
    height: "auto",
    padding: "10px 20px",
    fontSize: "20px",
    alignSelf: "flex-end",
    textAlign:"right"
}

const styleButtonFrame= {
    padding: "20px 8%",
    height:"90px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}


const ViewWishlist = (props) => {
    let { wid } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    const wishlist = useSelector(state => state.wishlist.wishlists[wid])

    const user = useSelector(state => state.interface.user)

    if (wishlist === undefined) {
        return <Empty message="No wishlist found"/>
    }

    let date = new Date(wishlist.createdDate)
    let displayDate = date.getDate( ) + '/' + (date.getMonth( ) + 1)+'/'+ date.getFullYear( );
    
    const handleBack = () => {
        dispatch(showNotification(
            ("Do you want to save the changes you made ?")
            ,
            "no",
            //onCancel
            ()=>{
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
        })) 
    }

    const handleFinish = () => {
        dispatch(showNotification(
            ("Notification on these items will be set. This wishlist will be saved in the Past Wishlists. Continue?")
            ,
            "no",
            //onCancel
            ()=>{
                dispatch(hideNotification())
            },
            "yes",
            //confirm
            ()=>{
                dispatch(saveAsPast(user.id, wid))
                dispatch(uploadNotifications(wid))
                history.push('/')
                dispatch(jumpTo('home'))
                dispatch(hideNotification())
        }))
    }

    return (
    <div style={styleBackground}>
        <div style={styleFrame}>
        <div style={styleTitleFrame}>
            <div style={styleTitle}>{wishlist.name}</div>
            <div style={styleDate}>Created at {displayDate}</div>
        </div>
        <div style={styleCardFrame}>
            {Object.values(wishlist.items).map((item, index)=>
                <ViewItemCard key={item.iid} name={item.name} 
                    status={item.status} wid={wid} iid={item.iid}/>
            )}
        </div>
        <div style={styleButtonFrame}>
            <HoverBox
                defaultStyle={styleButton}
                hoveredStyle={styleButtonCancel}
                onClickF={()=>{handleBack()}}
            >Back</HoverBox>
            <HoverBox
                defaultStyle={styleButton}
                hoveredStyle={styleButtonConfirm}
                onClickF={()=>handleFinish()}
            >Finish</HoverBox>
        </div>
        </div>
    </div>)
}

export default ViewWishlist