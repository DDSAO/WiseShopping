import { 
    ADD_WISHLIST,
    EXAMPLE_WISHLIST,
    REMOVE_WISHLIST,
} from "./actionTypes"

export const addWishlist = (wishlist) => {
    return {
        type : ADD_WISHLIST,
        newWishlist : wishlist
    }
}

export const removeWishlist = (wid) => {
    console.log(wid)
    return {
        type: REMOVE_WISHLIST,
        wid: wid,
    }
}

export const addExample = () => {
    return {
        type: EXAMPLE_WISHLIST,
    }
}

