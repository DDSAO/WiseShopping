import React from 'react';
import ViewItemCard from './ViewItemCard';

const styleFrame = {
    margin: "auto",
    height:"95%",
    width: "80%",
    borderLeft:"1px solid black",
    borderRight:"1px solid black",
}

const styleTitleFrame = {
    height: "100px",
    borderBottom: "1px solid black",
    display: "flex",
    justifyContent:"center"
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



const ViewWishlist = (props) => {
    
    return (
    <div style={styleFrame}>
        <div style={styleTitleFrame}>
            <div style={styleTitle}>Title</div>
            <div style={styleDate}>Created at</div>
            <div>
                <ViewItemCard />
            </div>
        </div>
    </div>
   )
}

export default ViewWishlist