import {
    ADD_WISHLIST,
    EXAMPLE_WISHLIST
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
    console.log('add example')
    return {
        ...state,
        wishlists: [
            {items: [
                {name: "Egg", Category: "egg", status: 0},
                {name: "Beef", Category: "beef", status: 0},
                {name: "chicken", Category: "chicken", status: 0},
                {name: "Lamb", Category: "lamb", status: 0},
            ],
            id : 1,
            status : 0,
            location : "1/16 Some Rd, Somewhere, QLD 9999",
            createdDate : Date.now(),
            updatedDate : Date.now(),
            }
        ]
    }
}

const wishlistReducer = (state = initState, action) => {
    console.log('in reducer')
    switch(action.type) {
        case ADD_WISHLIST : return addWishlist(state, action)
        case EXAMPLE_WISHLIST : 
        
            return {
                ...state,
                wishlists: [
                    {items: [
                        {name: "Egg", Category: "egg", status: 0},
                        {name: "Beef", Category: "beef", status: 0},
                        {name: "chicken", Category: "chicken", status: 0},
                        {name: "Lamb", Category: "lamb", status: 0},
                    ],
                    id : 1,
                    status : 0,
                    location : "1/16 Some Rd, Somewhere, QLD 9999",
                    createdDate : Date.now(),
                    updatedDate : Date.now(),
                    }
                ]
            }
        default: return state
    }
}

export default wishlistReducer;