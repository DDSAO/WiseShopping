
const initState = {
    wishlists: []
}

const addWishlist = (state = initState, action) => {
    switch(action.type) {
        case "ADD_WISHLIST" : return {
            ...state,
            wishlists: [
                ...wishlists,
                action.payload
            ]
        }
        default: return state
    }
}

export default addWishlist;