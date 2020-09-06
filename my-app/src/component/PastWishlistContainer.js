import React from 'react';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import WishlistCard from './WishlistCard';
import Card from './Card';
import { jumpTo } from '../redux';




const style = {
    width: "100%",
    padding: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    flexWrap : "wrap",
    overflow: "scroll",
}

const styleCardIcon = {
    color: "#555555",
    fontSize: "70",
}

const PastWishlist = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const pastWishlists = useSelector(state => state.wishlist.pastWishlists)

    return (
        <div style={style}>
            <Card 
                onClickF = {() => {
                    dispatch(jumpTo('home'))
                    history.push('/')}}
                text={"Back to Home"}
            >
                <KeyboardReturnIcon  style={styleCardIcon} />
            </Card>
            {! Object.keys(pastWishlists).length ? "" : 
                Object.values(pastWishlists).map((item, index) => 
                    <WishlistCard 
                        key={item.id} 
                        wid={item.id} 
                        data={item}
                        onClickF={()=>{
                            dispatch(jumpTo('pastWishlist'))
                            history.push('/pastWishlist/'+item.id)}}
                    />
                )}
        </div>
    )
}

export default PastWishlist