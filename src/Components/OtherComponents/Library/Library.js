import React from 'react'
import './Library.css'
import profileImage from '../../navigation/./ProfileImG.jpg';
import AllSection from './AllSection';
function Library(props) {
  return (
    <div className='LibraryPage'>
      
      
      <AllSection api_key={props.api_key}/>



      <div className='RightSide'>
        <div className='image'>
          <img src={profileImage}/>
        </div>
        <p className='Name'>Hasnain Ali</p>
        <div className='info'>
          <li><span>Subscriptions</span><span>77</span></li>
          <li><span>Uploads</span><span>23</span></li>
          <li><span>Likes</span><span>1,024</span></li>
        </div>
      </div>
    </div>
  )
}

export default Library