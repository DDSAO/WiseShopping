import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { addExample, createNewWishlist } from "../redux"

import WishlistCard from "./WishlistCard"
import Card from './Card';


//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HistoryIcon from '@material-ui/icons/History';



const style = {
    width: "70%",
    padding: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    alignContent: "flex-start",
    flexWrap : "wrap",
    overflow: "scroll",
}

const styleCardIcon = {
    color: "#555555",
    fontSize: "70",
}


const WishlistContainer = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const wishlists = useSelector(state => state.wishlist.wishlists)
  

    return (  
        
        <div style={style}>
            {! Object.keys(wishlists).length ? "" : 
                Object.entries(wishlists).map(([key,item], index) => 
                    <WishlistCard 
                        key={index} 
                        wid={key} 
                        data={item}
                        onClickF={()=>history.push('/viewWishlist/'+key)}
                    />
                )}
            <Card onClickF = {() => {
                
                history.push('/addNewWishlist')
                }}>
                <AddCircleOutlineIcon  style={styleCardIcon} 
                    text={"Create New Wishlist"}
                />
            </Card>
            <Card onClickF = {() => history.push('/pastWishlist')}>
                <HistoryIcon style={styleCardIcon} 
                    text={"View Past Wishlists"}/>
            </Card>
            <Card />
        </div>
    );
}
 
export default WishlistContainer;