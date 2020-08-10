import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addWishlist, addExample } from "../redux"

const style = {
    width: "70%",
    padding: "3%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
}

const WishlistCard = () => {
    const styleCard = {
        width: "300px",
        height: "185px",
        background: "white",
        border: "1px solid black",
        padding: "10px",
    }
    const styleCardHovered = {
        ...styleCard,
        background: "#DCDCDC"
    }

    const [isCardHovered, setCardHovered] = useState(false);

    return (
        <div 
            style={isCardHovered ? styleCardHovered : styleCard}
            onMouseEnter={() => setCardHovered(true)}
            onMouseLeave={() => setCardHovered(false)}
        >
                <span>Title</span>
                <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                </ul>
        </div>
    )
}

const WishlistContainer = () => {
    const dispatch = useDispatch()
    
    const wishlists = useSelector(state => state.wishlistReducer.wishlists)
    
    useEffect(() => {
        dispatch(addExample())
        console.log('container did mount')
        console.log(wishlists)
    }, [])
    
    return (  
        <div style={style}>
            <div>
                <WishlistCard />
            </div>
        </div>
    );
}
 
export default WishlistContainer;