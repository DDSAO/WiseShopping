import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addExample } from "../redux"

import WishlistCard from "./WishlistCard"

const style = {
    width: "70%",
    padding: "3%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
}




const WishlistContainer = () => {
    const dispatch = useDispatch()
    const wishlists = useSelector(state => state.wishlist.wishlists)
    useEffect(() => {dispatch(addExample())}, [])

    return (  
        
        <div style={style}>
            <div>
                <span>{JSON.stringify(wishlists)}</span>
                <span>{String(wishlists.length === 0)}</span>
                {! wishlists.length ? "" : wishlists.map((item, index) => <WishlistCard key={index} data={item}/>)}
            </div>
        </div>
    );
}
 
export default WishlistContainer;