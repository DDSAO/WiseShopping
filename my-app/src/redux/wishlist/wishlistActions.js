import { 
    ADD_WISHLIST,
    EXAMPLE_WISHLIST,
    REMOVE_WISHLIST,
    SELECT_ITEM,
    UNSELECT_ITEM,
    TOGGLE_ITEM,

    CREATE_NEW_WISHLIST,
    CLEAR_DRAFT,
    CREATE_NEW_ITEM_IN_NEW,
    CHANGE_ITEM_NAME_IN_DRAFT,
    DELETE_ITEM_IN_NEW,
    ADD_WISHLIST_FROM_DRAFT,
    SAVE_DRAFT_TITLE,

    CREATE_NEW_ITEM_IN_EDIT,
    CHANGE_ITEM_NAME_IN_EDIT,
    DELETE_ITEM_IN_EDIT,
    REROLL_CHANGE_IN_EDIT,

    TOGGLE_ITEM_STATUS,
} from "./actionTypes"


export const addWishlist = (wishlist) => {
    return {
        type : ADD_WISHLIST,
        newWishlist : wishlist
    }
}

export const removeWishlist = (wid) => {
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

//ids = wid(wishlist id) + iid(item id)
export const toggleItem = (ids) => {
    return {
        type: TOGGLE_ITEM,
        wid: ids.wid,
        iid: ids.iid
    }
}

export const createNewWishlist = () => {
    return {
        type: CREATE_NEW_WISHLIST,
    }
}

export const createNewItemInNew = (name) => {
    return {
        type: CREATE_NEW_ITEM_IN_NEW,
        name: name,
    }
}

export const changeItemNameInDraft = (iid, name) => {
    return {
        type: CHANGE_ITEM_NAME_IN_DRAFT,
        iid: iid,
        name: name,
    }
} 

export const deleteItemInNew = (iid) => {
    return {
        type: DELETE_ITEM_IN_NEW,
        iid: iid,
    }
}

export const clearDraft = () => {
    return {
        type: CLEAR_DRAFT
    }
}

export const addWishlistFromDraft = () => {
    return {
        type: ADD_WISHLIST_FROM_DRAFT,
    }
}

export const saveDraftTitle = (newTitle) => {
    return {
        type: SAVE_DRAFT_TITLE,
        title: newTitle,
    }
}

export const createNewItemInEdit = (wid,name) => {
    return {
        type: CREATE_NEW_ITEM_IN_EDIT,
        wid: wid,
        name: name,
    }
}

export const changeItemNameInEdit = (wid, iid, name) => {
    return {
        type: CHANGE_ITEM_NAME_IN_EDIT,
        wid: wid,
        iid: iid,
        name: name,
    }
} 


export const deleteItemInEdit = (wid,iid) => {
    return {
        type: DELETE_ITEM_IN_EDIT,
        wid: wid,
        iid: iid,
    }   
}

export const rerollChangeInEdit = (wid) => {
    return {
        type: REROLL_CHANGE_IN_EDIT,
        wid: wid,
    }
}
//View wishlsit
export const toggleItemStatus = (wid, iid) => {
    return {
        type: TOGGLE_ITEM_STATUS,
        wid: wid,
        iid: iid,
    }
}

