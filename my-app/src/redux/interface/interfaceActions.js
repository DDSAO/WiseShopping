import { 
    SHOW_MENU,
    HIDE_MENU,
    TOGGLE_MENU,
} from "./actionTypes"

export const showMenu = () => {
    type: SHOW_MENU
}

export const hideMenu = () => {
    type: HIDE_MENU
}

export const toggleMenu = () => {
    type: TOGGLE_MENU
}
