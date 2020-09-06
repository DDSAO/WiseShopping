import React from 'react';
import { getThemeProps } from '@material-ui/styles';

const style = {
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center"
}
const Welcome = (props) => {
    return(
        <div style={style}>
            <span>This is the welcome Page</span>
        </div>
    )
}
export default Welcome;