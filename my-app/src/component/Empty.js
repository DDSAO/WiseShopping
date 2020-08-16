import React from 'react';
import { getThemeProps } from '@material-ui/styles';

const style = {
    height: "95%",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"
}
const Empty = (props) => {
    return(
        <div style={style}>
            <span>404 NOT FOUND</span>
            <span>{props.message}</span>
        </div>
    )
}
export default Empty;