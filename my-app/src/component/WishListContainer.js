import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { addExample, createNewWishlist, jumpTo } from "../redux"

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
    const draft = useSelector(state => state.wishlist.newWishlist)
    
    return (  
        <div style={style}>
            {! Object.keys(wishlists).length ? "" : 
                Object.values(wishlists).map((item, index) => 
                    <WishlistCard 
                        key={item.id} 
                        wid={item.id} 
                        data={item}
                        name={item.name}
                        onClickF={()=>{
                            dispatch(jumpTo('viewWishlist'))
                            history.push('/viewWishlist/'+item.id)}}
                    />
                )}
            <Card 
                onClickF = {() => {
                    dispatch(jumpTo('addNewWishlist'))
                    history.push('/addNewWishlist')}}
                text={draft.name ? (<p>Continue <u>{draft.name}</u></p>): "Create New Wishlist"}
            >
                <AddCircleOutlineIcon  style={styleCardIcon} />
            </Card>
            <Card 
                onClickF = {() => {
                    dispatch(jumpTo('pastWishlists'))
                    history.push('/pastWishlists')}}
                text={"View Past Wishlists"}
            >
                <HistoryIcon style={styleCardIcon} />
            </Card> 
        </div>
    );
}
 
export default WishlistContainer;