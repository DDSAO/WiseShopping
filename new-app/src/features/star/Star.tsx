import React, { useEffect, useRef, CSSProperties } from 'react';

const rootStyles: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "absolute",
  //zIndex: -1,
}



export const Star = () => {

  const rootRef = useRef(null)
  const clientWidth = window.innerWidth
  const classNames = ['star-large', 'star-medium', 'star-small']

  const addStar = () => {
    let star = document.createElement('div')
    star.style.left = String(Math.random() * clientWidth) + 'px'
    star.style.bottom = "0px"
    star.style.position = "absolute";
    star.className = classNames[Math.floor(Math.random() * 3)];
    (rootRef.current! as any).appendChild(star) 
    setTimeout(() => star.remove(), 150 * 1000)
  }

  useEffect(() => {  
    let addStars: NodeJS.Timeout;
    if (document.visibilityState === 'visible') {
      addStars = setInterval(addStar, 1000);
    }
    let visibilityF = () => {
      if (document.visibilityState === 'visible') {
        addStars = setInterval(addStar, 1000);
      } else {
        clearInterval(addStars)
      }
    }
    document.addEventListener("visibilitychange", visibilityF);
    return () => {
      document.removeEventListener('visibilitychange', visibilityF)
      clearInterval(addStars)
    }
    
  }, [])

  return (
    <div ref={rootRef} style={rootStyles}>
      
    </div>
  )
}