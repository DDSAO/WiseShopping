import React from 'react';

const styleFrame = {
    margin: "auto",
    height:"95%",
    width: "80%",
    borderLeft:"1px solid black",
    borderRight:"1px solid black",
    display:"flex",
    flexDirection: "column",
}

const Page = () => {
    return (
        <div style={styleFrame}>
            A page
        </div>
    )
}

export default Page