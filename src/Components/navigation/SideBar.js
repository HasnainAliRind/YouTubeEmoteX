import React from 'react'
import logo from './Youtube-Logo.png'
import HomeIcon from '../OtherComponents/Icons/home-icon.png'
import moodIcon from '../OtherComponents/Icons/mood.png'
import SubscriptionIcon from '../OtherComponents/Icons/subscription.ico'
import LibraryIcon from '../OtherComponents/Icons/library.ico'

import { useDispatch , useSelector } from 'react-redux';
import { setHomePageStyles, setShadow, setSidebar } from '../../ReduxStore/ReduxSlice';
import {
    Link
  } from "react-router-dom";

function SideBar(props) {

    let dispatch = useDispatch();
    let sidebar = useSelector((state)=>state.videosData.sidebar)
    
    return (
        <div className='SideBar' style={{ left: sidebar ? "0" : "-100%" }}>
            <div className='Logo'>
                <i className='fas fa-bars' onClick={() => {
                    dispatch(setSidebar(false))
                    dispatch(setShadow(false))
                }}></i>
                <img src={logo} alt='Logo' />
            </div>
            <div className='menus'>
                <div className='firstPart'>
                     <li>
                            <div><img src={HomeIcon} alt="Icon"/></div>
                        <span><Link to='/' onClick={()=>{
                            dispatch(setHomePageStyles(true))
                        }}>Home</Link></span>
                    </li>
                    <li>
                        <div><img src={moodIcon} alt="Icon"/></div>
                        <span><Link to='/mood-based' onClick={()=>{
                            dispatch(setHomePageStyles(true))
                        }}>Mood</Link></span>
                    </li>
                    <li>
                        <div><img src={SubscriptionIcon} alt="Icon"/></div>
                        <span><Link to='/subscriptions' onClick={()=>{
                            dispatch(setHomePageStyles(true))
                        }}>Subscription</Link></span>
                    </li>
                    
                </div>
                <div className='secondPart'>
                <li>
                            <div><img src={LibraryIcon} alt="Icon"/></div>
                        <span><Link to='/library' onClick={()=>{
                            dispatch(setHomePageStyles(true))
                        }}>Library</Link></span>
                    </li>
                    <li>
                        <div><i className="fa-solid fa-clock-rotate-left"></i></div>
                        <span><Link to='/my-history' onClick={()=>{
                            dispatch(setHomePageStyles(true))
                        }}>History</Link></span>
                    </li>
                  
                </div>
                <div className='thirdPart'>

                </div>
            </div>
        </div>
    )
}

export default SideBar
