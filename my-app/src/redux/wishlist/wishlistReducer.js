import { 
    ADD_WISHLIST,
    EXAMPLE_WISHLIST,
    REMOVE_WISHLIST,
    SELECT_ITEM,
    UNSELECT_ITEM,
    TOGGLE_ITEM,
    CREATE_NEW_WISHLIST,
    CLEAR_DRAFT,
    CREATE_NEW_ITEM,
    DELETE_ITEM_IN_NEW,
    ADD_WISHLIST_FROM_DRAFT,
    SAVE_DRAFT_TITLE
} from "./actionTypes"


const initState = {
    currentWid: 0,
    wishlists: {0:
        {items: [
            {name: "Egg", Category: "egg", status: 0, iid:0},
            {name: "Beef", Category: "beef", status: 0, iid:1},
            {name: "chicken", Category: "chicken", status: 0, iid:2},
            {name: "Lamb", Category: "lamb", status: 0, iid:3},
            {name: "chicken", Category: "chicken", status: 0, iid:4},
            {name: "Lamb", Category: "lamb", status: 0, iid:5},
            {name: "chicken", Category: "chicken", status: 0, iid:6},
            {name: "Lamb", Category: "lamb", status: 0, iid:7},
        ],
        name: "A wishlist",
        id : 1,
        status : 0,
        location : "1/16 Some Rd, Somewhere, QLD 9999",
        createdDate : Date.now(),
        updatedDate : Date.now()
        }
    },
    newWishlist : {}
}

const addWishlist = (state, action) => {
    const newWid = state.currentWid + 1
    return {
        ...state,
        currentWid: newWid,
        wishlists: {
            ...state.wishlists,
            newWid : action.newWishlist
        }
    }
}

const addExample = (state, action) => {
    return {
        ...state,
        currentWid: 0,
        wishlists: {0:
            {items: [
                {name: "Egg", Category: "egg", status: 0, iid:0},
                {name: "Beef", Category: "beef", status: 0, iid:1},
                {name: "chicken", Category: "chicken", status: 0, iid:2},
                {name: "Lamb", Category: "lamb", status: 0, iid:3},
                {name: "chicken", Category: "chicken", status: 0, iid:4},
                {name: "Lamb", Category: "lamb", status: 0, iid:5},
                {name: "chicken", Category: "chicken", status: 0, iid:6},
                {name: "Lamb", Category: "lamb", status: 0, iid:7},
            ],
            name: "A wishlist",
            id : 1,
            status : 0,
            location : "1/16 Some Rd, Somewhere, QLD 9999",
            createdDate : Date.now(),
            updatedDate : Date.now()
            }
        }
    }
}

const removeWishlist = (state, action) => {
    const newWishlists = Object.create(state.wishlists)
    delete newWishlists[action.wid]
    return {
        ...state,
        wishlists: newWishlists
    }
}

const deleteItem = (state, action) => {
    let wid = action.wid
    let newItems = Array.from(state.wishlists[wid].items)
    for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].iid === action.iid) {
            newItems = newItems.splice(i, 1)
        }
    }
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            wid : {
                ...state.wishlists.wid,
                items : newItems
            }
        }
    }
}

const toggleItem = (state, action) => {
    let wid = action.wid
    let newItems = Array.from(state.wishlists[wid].items)
    for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].iid === action.iid) {
            newItems = newItems.splice(i, 1)
        }
    }
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            wid : {
                ...state.wishlists.wid,
                items : newItems
            }
        }
    }
}

const createNewWishlist = (state, action) => {
    return {
        ...state,
        currentWid : state.currentWid + 1,
        newWishlist : {
            items: {},
            name: "A New Wishlist",
            id : state.currentWid,
            status : 0,
            location : "N/A",
            createdDate : Date.now(),
            updatedDate : Date.now(),
            currentIid : 0,
        }
    }
}
const clearDraft = (state, action) => {
    return {
        ...state,
        newWishlist: {}
    }
}

const createNewItem = (state, action) => {
    let currentIid = state.newWishlist.currentIid
    console.log({
        ...state,
        newWishlist : {
            ...state.newWishlist,
            currentIid : currentIid + 1,
            items: {
                ...state.newWishlist.items,
                [currentIid] : {
                    name: action.name, 
                    Category: "", 
                    status: 0, 
                    iid: currentIid}
            },
        }
    })
    return {
        ...state,
        newWishlist : {
            ...state.newWishlist,
            currentIid : currentIid + 1,
            items: {
                ...state.newWishlist.items,
                [currentIid] : {
                    name: action.name, 
                    Category: "", 
                    status: 0, 
                    iid: currentIid}
            },
        }
    }
    
}

const deleteItemInNew = (state, action) => {
    let newItems = state.newWishlist.items
    delete newItems[action.iid]
    return {
        ...state,
        newWishlist: {
            ...state.newWishlist,
            items: newItems
        }
    }
}

const saveDraftTitle = (state, action) => {
    return {
        ...state,
        newWishlist: {
            ...state.newWishlist,
            name: action.title
        }
    }
}

const wishlistReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_WISHLIST : return addWishlist(state, action)
        case EXAMPLE_WISHLIST : return addExample(state, action)
        case REMOVE_WISHLIST : return removeWishlist(state, action)
        case TOGGLE_ITEM : return toggleItem(state, action)
        case CREATE_NEW_WISHLIST : return createNewWishlist(state, action)
        case CLEAR_DRAFT : return clearDraft(state, action)
        case CREATE_NEW_ITEM : return createNewItem(state, action)
        case DELETE_ITEM_IN_NEW : return deleteItemInNew(state, action)
        case SAVE_DRAFT_TITLE : return saveDraftTitle(state, action)
        default: return state
    }
}

export default wishlistReducer;