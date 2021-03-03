import { 
    JADE_GREEN,
    LIGHT_RED,
 } from "./colors";


export const displayCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export const flexCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

export const styleButton = {
    width: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border:"1px solid black",
    userSelect: "none",
}

export const styleButtonConfirm = {
    ...styleButton,
    background: JADE_GREEN,
}

export const styleButtonCancel = {
    ...styleButton,
    background: LIGHT_RED,
}

export const styleIcon = {
    ...flexCenter,
    height: "30px",
    width: "30px",
    borderRadius:"10px",
    userSelect: "none",
}
