import React, { useEffect, useState } from 'react'
import './HomePage.css'
import VideoCard from './VideoUI/VideoCard'
import moodIcon from './Icons/mood.png'
import subscriptionsIcon from './Icons/subscription.ico'
import libraryIcon from './Icons/library.ico'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import YTVideoPlayer from './YoutubeVideoPlayer/YTVideoPlayer'
import { useDispatch, useSelector } from 'react-redux';
import FourZeroFourPage from './FourZeroFourPage'
import Library from './Library/Library'
import Subscription from './Subscription/Subscription'
import SearchedVideos from './searched_videos/SearchedVideos'
import History from './HistoryComponent/History'
import Mood from './MoodBased/Mood'
import Spinner from './Spinner'
import { setScreenSize } from '../../ReduxStore/ReduxSlice'
import SearchComponent from './SearchComponent'


function HomePage(props) {


  useEffect(() => {
    let timer = setTimeout(() => {
      setLoading(true)
      let url = `https://www.googleapis.com/youtube/v3/search?key=${props.api_key}&part=snippet&maxResults=10&type=video&q=`
      fetch(url).then((result) => {
        return result.json()
      }).then((data) => {
        data.error == undefined &&
          setSearchedVideosData(data.items)
          setLoading(false)
      }).catch(() => {
        setLoading(false)
  
      })
    }, 800);
    return () => clearTimeout(timer)
  }, [])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let dispatch = useDispatch();
  // dispatch(setScreenSize(window.innerWidth))
  useEffect(() => {
    dispatch(setScreenSize(window.innerWidth));
  }, []);
  let screenSize = useSelector((state)=>state.videosData.screenSize);

  useEffect(() => {
    // Function to update window width
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);

    };
    
    // Add event listener to handle window resize
    window.addEventListener('resize', updateWindowWidth);

    // Cleanup by removing the event listener
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  let [searchedVideosData, setSearchedVideosData] = useState(null)
  let [loading, setLoading] = useState(false)

  let defaultStyle = {
   
  }
  let onVideoPlayingStyles = {
    
  }


  let homePageStyles = useSelector((state) => state.videosData.homePageStyles)

    if (screenSize < 920) {
      defaultStyle = {
        display: "flex",
        flexDirection: 'column-reverse',
        justifyContent: 'space-between'
      }
      onVideoPlayingStyles = {
        display: "block"
      }
    }else{
      
      defaultStyle = {
        display: "grid",
        gridTemplateColumns: "5rem auto",
        columnGap: "20px"
      }
      onVideoPlayingStyles = {
        display: "block"
      }
    }

  let mobileSearch = useSelector((state)=>state.videosData.mobileSearch);


  
  
  return (
    <div className='HomePage' style={homePageStyles ? defaultStyle : onVideoPlayingStyles}>
     { 
     !mobileSearch.status &&
     <div className='sideMenus' style={{ display: homePageStyles ? "flex" : "none" }}>
        <Link to="/"><i className='fas fa-home'></i>Home</Link>
        <Link to="/mood-based"><img src={moodIcon} alt="icon" />Mood</Link>
        <Link to="/subscriptions"><img src={subscriptionsIcon} alt="icon" />Subscriptions</Link>
        <Link to="/library"><img src={libraryIcon} alt="icon" />Library</Link>
      </div>
    }
      <Routes>

        <Route path='/' element={<div className='Page'>
          {
          searchedVideosData !== null && searchedVideosData.map((video)=>{
            return <VideoCard video={video} key={video.id.videoId} api_key={props.api_key}/>
          })
        } {
          searchedVideosData == null && <Spinner/>
        }
        </div>}
        >
        </Route>

        <Route path='/videos' element={<YTVideoPlayer api_key={props.api_key}/>}></Route>
        <Route path='/library' element={<Library api_key={props.api_key}/>}></Route>
        <Route path='/mood-based' element={<Mood api_key={props.api_key}/>}></Route>
        <Route path='/subscriptions' element={<Subscription api_key={props.api_key} />}></Route>
        <Route path='/searchedVideos' element={<SearchedVideos api_key={props.api_key}/>}></Route>
        <Route path='/my-history' element={<History  api_key={props.api_key}/>}></Route>
        
        {
          screenSize < 600 && <Route path='/search' element={<SearchComponent />}></Route>
        }
        <Route path='*' element={<FourZeroFourPage title="Page is not founding...!" />}></Route>
      </Routes>
    </div>


  )
}

export default HomePage
