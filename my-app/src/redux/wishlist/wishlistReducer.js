import { 
    ADD_WISHLIST,
    EXAMPLE_WISHLIST,
    REMOVE_WISHLIST,
} from "./actionTypes"



const initState = {
    wishlists: []
}

const addWishlist = (state, action) => {
    return {
        ...state,
        wishlists: [
            ...state.wishlists,
            action.newWishlist
        ]
    }
}

const addExample = (state, action) => {
    return {
        ...state,
        wishlists: [
            {items: [
                {name: "Egg", Category: "egg", status: 0},
                {name: "Beef", Category: "beef", status: 0},
                {name: "chicken", Category: "chicken", status: 0},
                {name: "Lamb", Category: "lamb", status: 0},
                {name: "chicken", Category: "chicken", status: 0},
                {name: "Lamb", Category: "lamb", status: 0},
                {name: "chicken", Category: "chicken", status: 0},
                {name: "Lamb", Category: "lamb", status: 0},
            ],
            name: "A wishlist",
            id : 1,
            status : 0,
            location : "1/16 Some Rd, Somewhere, QLD 9999",
            createdDate : Date.now(),
            updatedDate : Date.now()
            }
        ]
    }
}

const removeWishlist = (state, action) => {
    const newWishlists = Array.from(state.wishlists)
    for (let i = 0; i < newWishlists.length ; i++) {
        if (parseInt(newWishlists[i].id) === parseInt(action.wid)) {
            newWishlists.splice(i, 1)
        }
    }
    return {
        ...state,
        wishlists: newWishlists
    }
}

const wishlistReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_WISHLIST : return addWishlist(state, action)
        case EXAMPLE_WISHLIST : return addExample(state, action)
        case REMOVE_WISHLIST : return removeWishlist(state, action)
        default: return state
    }
}

export default wishlistReducer;