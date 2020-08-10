import { 
    ADD_WISHLIST,
    EXAMPLE_WISHLIST,
} from "./actionTypes"

export const addWishlist = (wishlist) => {
    return {
        type : ADD_WISHLIST,
        newWishlist : wishlist
    }
}

export const addExample = () => {
    return {
        type: EXAMPLE_WISHLIST,
    }
}