import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ViewItemCard from './ViewItemCard';
import Empty from './Empty';
import HoverBox from './HoverBox';




const styleFrame = {
    margin: "auto",
    height:"95%",
    width: "80%",
    borderLeft:"1px solid black",
    borderRight:"1px solid black",
    display:"flex",
    flexDirection: "column",
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

const ViewWishlist = (props) => {
    let { wid } = useParams()
    const wishlist = useSelector(state => state.wishlist.wishlists[wid])

    if (wishlist === undefined) {
        return <Empty message="No wishlist found"/>
    }

    console.log(wishlist)
    let date = new Date(wishlist.createdDate)
    let displayDate =date.getDate( ) + '/' + (date.getMonth( ) + 1)+'/'+ date.getFullYear( );
    
    return (
    <div style={styleFrame}>
        <div style={styleTitleFrame}>
            <div style={styleTitle}>{wishlist.name}</div>
            <div style={styleDate}>Created at {displayDate}</div>
        </div>
        <div style={styleCardFrame}>
            {wishlist.items.map((item, index)=>
                <ViewItemCard key={index} name={item.name} status={item.status}/>
            )}
        </div>
        <div style={styleButtonFrame}>
            <HoverBox
                defaultStyle={styleButton}
                hoveredStyle={styleButtonHovered}
            >Back</HoverBox>
            <HoverBox
                defaultStyle={styleButton}
                hoveredStyle={styleButtonHovered}
            >Finish</HoverBox>
        </div>
    </div>
   )
}

export default ViewWishlist