import { 

    ADD_WISHLISTS,
    EXAMPLE_WISHLIST,
    REMOVE_WISHLIST,

    TOGGLE_ITEM,

    CREATE_NEW_WISHLIST,
    CLEAR_DRAFT,
    CREATE_NEW_ITEM_IN_NEW,
    CHANGE_ITEM_NAME_IN_DRAFT,
    DELETE_ITEM_IN_NEW,

    SAVE_DRAFT_TITLE,

    DELETE_ITEM_IN_EDIT,
    CREATE_NEW_ITEM_IN_EDIT,
    CHANGE_ITEM_NAME_IN_EDIT,
    REROLL_CHANGE_IN_EDIT,


    TOGGLE_ITEM_STATUS,

    ADD_PAST_WISHLISTS,
} from "./actionTypes"


const initState = {
    currentWid: 2,
    wishlists: {},
    newWishlist : {},
    pastWishlists : {}
    
}

const addWishlists = (state, action) => {
    let wishlists = {}
    action.wishlists.map(wishlist => {
        wishlists[wishlist.wid] = wishlist
    })
    return {
        ...state,
        wishlists : {
            ...wishlists,
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
                {name: "Beef", Category: "beef", status: 1, iid:1},
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
    const newWishlists = state.wishlists
    delete newWishlists[action.wid]
    return {
        ...state,
        wishlists: JSON.parse(JSON.stringify(newWishlists))
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

const createNewItemInNew = (state, action) => {
    let currentIid = state.newWishlist.currentIid
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
const changeItemNameInDraft = (state, action) => {

    return {
        ...state,
        newWishlist: {
            ...state.newWishlist,
            items: {
                ...state.newWishlist.items,
                [action.iid]: {
                    ...state.newWishlist.items[action.iid],
                    name: action.name
                }
            }
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


const deleteItemInEdit = (state, action) => {
    let newItems = state.wishlists[action.wid].items
    delete newItems[action.iid]
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            [action.wid] : {
                ...state.wishlists[action.wid],
                items: newItems,
            }
        }
    }
}
const createNewItemInEdit = (state, action) => {
    let currentIid = state.wishlists[action.wid].currentIid
    return {
        ...state,
        wishlists : {
            ...state.wishlists,
            [action.wid] : {
                ...state.wishlists[action.wid],
                currentIid : currentIid + 1,
                items: {
                    ...state.wishlists[action.wid].items,
                    [currentIid] : {
                        name: action.name, 
                        Category: "", 
                        status: 0, 
                        iid: currentIid}
                }
            },
        }
    }
}

const changeItemNameInEdit = (state, action) => {
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            [action.wid] : {
                ...state.wishlists[action.wid],
                items: {
                    ...state.wishlists[action.wid].items,
                    [action.iid] : {
                        ...state.wishlists[action.wid].items[action.iid],
                        name: action.name
                    }
                }
            }
        }
    }
}

const toggleItemStatus = (state, action) => {
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            [action.wid] : {
                ...state.wishlists[action.wid],
                items: {
                    ...state.wishlists[action.wid].items,
                    [action.iid] : {
                        ...state.wishlists[action.wid].items[action.iid],
                        status: 1 - state.wishlists[action.wid].items[action.iid].status,
                    }
                }
            }
        }
    }
}

const rerollChangeInEdit = (state, action) => {
    return state
    return {
        ...state,
        wishlists: {
            ...state.wishlists,
            [action.wid] : {
                ...state.wishlists[action.wid],
                items: action.backup,
                }
            }
        }
}

const addPastWishlists = (state, action) => {
    let pastWishlists = {}
    action.pastWishlists.map(past=> {
        pastWishlists[past.wid] = past
    })

    return {
        ...state,
        pastWishlists: pastWishlists
    }
}


const wishlistReducer = (state = initState, action) => {
    switch(action.type) {
        //home page
        case ADD_WISHLISTS : return addWishlists(state, action)
        case EXAMPLE_WISHLIST : return addExample(state, action)
        case REMOVE_WISHLIST : return removeWishlist(state, action)
        case TOGGLE_ITEM : return toggleItem(state, action)

        //draft page
        case CREATE_NEW_WISHLIST : return createNewWishlist(state, action)
        case CLEAR_DRAFT : return clearDraft(state, action)
        case CREATE_NEW_ITEM_IN_NEW : return createNewItemInNew(state, action)
        case CHANGE_ITEM_NAME_IN_DRAFT : return changeItemNameInDraft(state, action)
        case DELETE_ITEM_IN_NEW : return deleteItemInNew(state, action)
        case SAVE_DRAFT_TITLE : return saveDraftTitle(state, action)
    
        //edit page
        case DELETE_ITEM_IN_EDIT : return deleteItemInEdit(state, action)
        case CREATE_NEW_ITEM_IN_EDIT : return createNewItemInEdit(state, action)
        case CHANGE_ITEM_NAME_IN_EDIT : return changeItemNameInEdit(state, action)
        case REROLL_CHANGE_IN_EDIT : return rerollChangeInEdit(state, action)

        //view page
        case TOGGLE_ITEM_STATUS : return toggleItemStatus(state, action)

        case ADD_PAST_WISHLISTS: return addPastWishlists(state, action)
        default: return state
    }
}

export default wishlistReducer;