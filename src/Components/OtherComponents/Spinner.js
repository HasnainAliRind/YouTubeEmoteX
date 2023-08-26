import React from 'react'
import './HomePage.css'
import spinner from './Spinner.gif'
function Spinner(props) {
  return (
      //  <div className="lds-ring" style={{width: props.width ? props.width : "80px" }}><div></div><div></div><div></div><div></div></div>
      <div className='spinner' style={{width: '90px' , margin: "auto"}}>
        <img src={spinner} style={{width: "100%"}} alt='Loading...'/>
      </div>
  )
}

export default Spinner
