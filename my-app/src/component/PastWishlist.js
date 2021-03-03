import React from 'react';
import { useParams } from 'react-router-dom';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckIcon from '@material-ui/icons/Check';
import { useSelector } from 'react-redux';

import Background from '../asset/background.jpg'


import { styleButton, styleButtonCancel, styleButtonConfirm } from '../css/css';
import { useHistory } from 'react-router-dom';
import HoverBox from './HoverBox';

const styleBackground = {
    background: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

const style={
    paddingTop: "5%",
    width: "60%",
    height: "100%",
    display:"flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    backdropFilter: "blur(20px)",
    margin: "auto",
}
const styleCard = {
    margin: "5px 0",
    width: "500px",
    height: "50px",
    padding:"0 20px",
    border: "1px solid black",
    display:"flex",
}
const styleIconFrame = {
    width:"40px",
    margin: "0 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
}
const styleIcon = {
    position: "absolute",
    fontSize: "30px",
    fill:"#CCCCCC",
}
const styleIconNotSelected = {
    ...styleIcon,
    fill: "none",
}
const styleIconSelected = {
    ...styleIcon,
    fill: "grey",
}
const styleTickNotSelected = {
    ...styleIconNotSelected,

    fontSize: "20px"
}
const styleTickSelected = {
    ...styleTickNotSelected,
    fill: "black",
}

const styleItem = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "left",
    fontSize: "25px",
    userSelect: "none",
}
const styleButtonFrame= {
    padding: "20px 8%",
    height:"90px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}




const PastWishlistCard = (props) => {
    return (
        <div style={styleCard}>   
            <div style={styleIconFrame}>
                <RadioButtonUncheckedIcon style={styleIcon} />
                <FiberManualRecordIcon style={props.status ? styleIconSelected : styleIconNotSelected} />
                <CheckIcon style={props.status ? styleTickSelected : styleTickNotSelected}/>
            </div>
            <div style={styleItem}>{props.name}</div>
        </div>
    )
}

const PastWishlist = () => {
    const { wid } = useParams()
    const pastWishlist = useSelector(state => state.wishlist.pastWishlists[wid])
    const updatedDate = new Date(pastWishlist.updatedDate)
    const history = useHistory()
    return (
        <div style={styleBackground}>
            <div style={style}>
                <h1>{pastWishlist.name}</h1>
                <p>Finished at {updatedDate.toDateString()}</p>
                {pastWishlist.items ? Object.values(pastWishlist.items).map(item=>
                    <PastWishlistCard key={item.iid} name={item.name} status={item.status}/>):null
                }
            <div style={styleButtonFrame}>
                <HoverBox
                    defaultStyle={styleButton}
                    hoveredStyle={styleButtonConfirm}
                    onClickF={()=>history.push('/pastWishlists')}
                >Return</HoverBox>
            </div>
            </div>
            
        </div>
    )
}

export default PastWishlist