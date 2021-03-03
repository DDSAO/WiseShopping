import React, {useEffect} from 'react';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import WishlistCard from './WishlistCard';
import Card from './Card';
import { jumpTo, fetchPastWishlists } from '../redux';



import Background from '../asset/background.jpg'
import LoadingImage from './LoadingImage';

const styleBackground = {
    background: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

const style = {
    width: "100%",
    padding: "5% 2%",
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

const PastWishlist = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const pastWishlists = useSelector(state => state.wishlist.pastWishlists)
    const user = useSelector(state => state.interface.user)

    useEffect(()=> {
        dispatch(fetchPastWishlists(user.uid))
    }, [])

    return (
        <div style={styleBackground}>
            <div style={style}>
                <Card 
                    onClickF = {() => {
                        dispatch(jumpTo('home'))
                        history.push('/')}}
                    text={"Back to Home"}
                >
                    <KeyboardReturnIcon  style={styleCardIcon} />
                </Card>
                {! Object.keys(pastWishlists).length ? null : 
                    Object.values(pastWishlists).map((item, index) => 
                        <WishlistCard 
                            isPast = {1}
                            key={item.wid} 
                            wid={item.wid} 
                            data={item}
                            onClickF={()=>{
                                dispatch(jumpTo('pastWishlist'))
                                history.push('/pastWishlist/'+item.wid)}}
                        />)
                }
                
            </div>
        </div>
    )
}

export default PastWishlist