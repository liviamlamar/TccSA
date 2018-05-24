import React from 'react'

const Pin = (props) => {
  
  return (
    <span ref={ props.refValue } style={{ width: 25, height: 25, textAlign: 'center', fontSize:'1em', lineHeight: '1.7em', border:'2px solid #000', borderRadius: '50%', position:'absolute', top:`${ props.posY }`, left:`${props.posX}`, color:'#000', display:`${props.display}` }}>
      { props.counter }
    </span>
  )

}

export default Pin