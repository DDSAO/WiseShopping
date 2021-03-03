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

    CREATE_NEW_ITEM_IN_EDIT,
    CHANGE_ITEM_NAME_IN_EDIT,
    DELETE_ITEM_IN_EDIT,
    REROLL_CHANGE_IN_EDIT,


    TOGGLE_ITEM_STATUS,

    ADD_PAST_WISHLISTS,
    
} from "./actionTypes"
import { getServerUrl } from "../../global";
import { showNotification, hideNotification, fetching, fetched } from "../interface/interfaceActions";

export const fetchWishlists = (uid) => (dispatch) => {
    dispatch(fetching("fetching todo wishlists"))
    fetch(getServerUrl('/wishlist/fetch/todo/'+uid), {
        method: "GET",
        credentials: "include"
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("fetching todo wishlists"))
        if(res.success) {
            dispatch({
                type: ADD_WISHLISTS,
                wishlists: res.data
            })
        } else {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        }
    })
}


export const removeWishlist = (id, wid) => (dispatch) => {
    dispatch(fetching("deleting wishlist"))
    fetch(getServerUrl('/wishlist/removeWishlist'), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id:id, wid:wid}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("deleting wishlist"))
        if (! res.success) {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        } else {
            dispatch({type: REMOVE_WISHLIST, wid: wid})
        }
    })
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

export const addWishlist = (id, draft) => (dispatch) => {
    dispatch(fetching("Adding wishlist"))
    fetch(getServerUrl('/wishlist/addWishlist'), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id:id, draft:draft}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("Adding wishlist"))
        if (! res.success) {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        }
    })
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

export const uploadEdittedWishlist = (id, wid, updatedWishlist) => (dispatch) => {
    dispatch(fetching("Uploading wishlist"))
    fetch(getServerUrl('/wishlist/changeWishlist'), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id:id, wid: wid, updatedWishlist: updatedWishlist}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("Uploading wishlist"))
        if (! res.success) {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        }
    })
}


//View wishlsit
export const toggleItemStatus = (wid, iid) => {
    return {
        type: TOGGLE_ITEM_STATUS,
        wid: wid,
        iid: iid,
    }
}

export const saveAsPast = (id, wid) => (dispatch) => {
    dispatch(fetching("submitting"))
    fetch(getServerUrl('/wishlist/saveAsPast'), {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({id:id, wid: wid}),
        headers: {
            'content-type': 'application/json',
        }
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("submitting"))
        if (! res.success) {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        }
    })
}

//past wishlist
export const fetchPastWishlists = (uid) => (dispatch) => {
    dispatch(fetching("fetching past wishlists"))
    fetch(getServerUrl('/wishlist/fetch/past/'+uid), {
        method: "GET",
        credentials: "include"
    })
    .then(res=>res.json())
    .then(res=>{
        dispatch(fetched("fetching past wishlists"))
        if(res.success) {
            dispatch({
                type: ADD_PAST_WISHLISTS,
                pastWishlists: res.data
            })
        } else {
            dispatch(showNotification(res.message, 
                "ok", ()=>dispatch(hideNotification()),
                "gotcha", ()=>dispatch(hideNotification())
            ))
        }
    })
}

