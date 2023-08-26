import React, { useRef, useState } from 'react'
import YtLogo from './Youtube-Logo.png';
import './Navbar.css'
import ProfileImg from './ProfileImG.jpg';
import { useDispatch , useSelector } from 'react-redux';
import { setHomePageStyles, setMobileSearch, setSearchedTerm, setShadow, setSidebar } from '../../ReduxStore/ReduxSlice';
import { Link, useLocation } from 'react-router-dom';


function Navbar() {
  
  let dispatch = useDispatch();
  let searchedTerm = useSelector((state)=>state.videosData.searchedTerm);
  let clickRef = useRef();
  let homeRef = useRef();
  const location = useLocation();
  let [search_query , setSearchQuery] = useState("")
  let mobileSearch = useSelector((state)=>state.videosData.mobileSearch)
  return (

    <div className='Navbar'>
          <Link to="searchedVideos" style={{display: "none"}} ref={clickRef}>
            Search
          </Link>
          <Link to="/" style={{display: "none"}} ref={homeRef}>
            Home
          </Link>
        <div className='leftSide'>
        <i className="fas fa-bars" onClick={()=>{
              dispatch(setSidebar(true))
              dispatch(setShadow(true))
            }}></i>
            <img src={YtLogo} alt='notFounding'/>
        </div>

        <div className='SearchPart'>
            <div className='search'>
              <input type='text' placeholder='Search' value={search_query} onChange={(e)=>{
                setSearchQuery(e.target.value)
              }} onKeyUp={(e)=>{
                if (e.key === "Enter") {
                  dispatch(setSearchedTerm(e.target.value))
                  
                  dispatch(setHomePageStyles(true))
                  if (searchedTerm === "") {
                    homeRef.current.click();
                  }else{
                    clickRef.current.click();
                  }
                }
              }}/>
              <button className='search-icon'>
                <i className='fas fa-search'></i>
              </button>
            </div>
            <button className='voiceIcon'><i className="fa-solid fa-microphone"></i></button>
        </div>

        <div className='rightSide'>
            <button><i className="fa fa-video"></i></button>
            <button><i className='fas fa-bell'></i></button>
            <button id='searchBTn' onClick={()=>{
              dispatch(setMobileSearch({status: true , previousComponent: location.pathname}))
            }}><Link to={'/search'}><i className='fas fa-search'></i></Link></button>
            <div className='profile'>
              <img src={ProfileImg} alt='NotFounding'/>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
