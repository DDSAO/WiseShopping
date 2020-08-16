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
    SAVE_DRAFT_TITLE,
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

export const createNewItem = (name) => {
    return {
        type: CREATE_NEW_ITEM,
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
