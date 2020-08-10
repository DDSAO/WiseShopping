import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
} from "./actionTypes"

const initState = {
    showMenu: false,
}

const interfaceReducer = (state = initState, action) => {
    switch(action.type) {
        case SHOW_MENU : return {
            ...state,
            showMenu: true,
        }
        case HIDE_MENU : return {
            ...state,
            showMenu: false,
        }
        case TOGGLE_MENU : return {
            ...state,
            showMenu: ! state.showMenu,
        }
        default: return state
    }
}

export default interfaceReducer;