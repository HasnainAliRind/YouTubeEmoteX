
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
  Link
} from "react-router-dom";
import { setHomePageStyles, setMobileSearch, setSearchedTerm } from '../../ReduxStore/ReduxSlice';
function SearchComponent() {
  let mobileSearch = useSelector((state)=>state.videosData.mobileSearch);
  let dispatch = useDispatch()
  let searchedTerm = useSelector((state)=>state.videosData.searchedTerm);
  let clickRef = useRef();
  let homeRef = useRef();
  return (
    <div className='SearchedComponent'>
       <Link to="/searchedVideos" style={{display: "none"}} ref={clickRef}>
            Search
          </Link>
          <Link to="/" style={{display: "none"}} ref={homeRef}>
            Home
          </Link>
        <div className='searching_place'>
            <button><Link to={mobileSearch.previousComponent} onClick={()=>{
              dispatch(setMobileSearch({status: false ,  previousComponent: "/"}))
            }}><i className='fas fa-arrow-left'></i></Link></button>
            <input type='search' placeholder='Search videos' value={searchedTerm} onChange={(e)=>{
              dispatch(setSearchedTerm(e.target.value))
              
            }} onKeyUp={(e)=>{
              if (e.key === "Enter") {
                dispatch(setSearchedTerm(e.target.value))
                dispatch(setHomePageStyles(true))
                dispatch(setMobileSearch({status: false , previousComponent: "/"}))
                if (searchedTerm === "") {
                  homeRef.current.click();
                }else{
                  clickRef.current.click();
                }
            }
            }} />
        </div>
    </div>
  )
}

export default SearchComponent
