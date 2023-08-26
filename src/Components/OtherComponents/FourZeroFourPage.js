import React from 'react'
import ytImage from '../navigation/Youtube-Logo.png'
function FourZeroFourPage(props) {
  return (
    <div className='FourZeroFour'>
        <div className='logo'>
            <img src={ytImage} alt="Icon"/>
        </div>
        <p className='title'>{props.title}</p>
    </div>
  )
}

export default FourZeroFourPage
