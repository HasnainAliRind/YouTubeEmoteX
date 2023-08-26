import React, { useEffect, useState } from 'react'
import './VideoCard.css'
import channelImage from './ChannelImg.jpg'
import { useDispatch , useSelector } from 'react-redux';
import { setCurrentVideo, setHomePageStyles } from '../../../ReduxStore/ReduxSlice';
import {Link} from "react-router-dom";



function VideoCard(props) {
   

    let [channelData , setChannelData] = useState(null);
    let screenSize = useSelector((state)=>state.videosData.screenSize)

    useEffect(() => {
        
        const API_KEY = "AIzaSyDtSqavKIIBg0qAd7f9EK_IFpQh3Sbw4Bo";
        const CHANNEL_ID = `${props.video.snippet.channelId}`;
    
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${props.api_key}`)
          .then((response) => response.json())
          .then((data) => {
            data.items && data.items.length > 0 && setChannelData(data.items[0].snippet);
          })
          .catch((error) => console.error("Error fetching channel data:", error));
      }, [props]);

      let dispatch = useDispatch();

     
      let addToHistory = (video) =>{
        let id = video.id.videoId
        let history = localStorage.getItem("youtube_videos_history");
        if (history !== null) {
          let youtube_videos_history = JSON.parse(localStorage.getItem("youtube_videos_history"));
          let is_Already_Present = youtube_videos_history.some((item)=>item.id.videoId === id);
          console.log("inside");
          if (is_Already_Present) {
            console.log("Video was present");
            let newArray = youtube_videos_history.filter((item)=>item.id.videoId !== id)
            newArray.unshift(video)
            localStorage.setItem("youtube_videos_history",JSON.stringify(newArray))
          }else{
            console.log("Video was not present");
            youtube_videos_history.unshift(video);
            localStorage.setItem("youtube_videos_history",JSON.stringify(youtube_videos_history))
          }
        }else{
          let history_array = []
          history_array.push(video);
          localStorage.setItem("youtube_videos_history",JSON.stringify(history_array))
        }
      }


    return (
        <Link to={"/videos"} style={{"textDecoration": "none", "color":"black"}} onClick={()=>{
          dispatch(setCurrentVideo(props.video))  
          addToHistory(props.video);
          screenSize > 920 ? dispatch(setHomePageStyles(false)) : dispatch(setHomePageStyles(true))
        }}>
        <div className='VideoCard'>
            <div className='Thumbnail' style={{ background: `url(${props.video.snippet.thumbnails.medium.url}) no-repeat center center/cover` }}></div>
            <div className='Channel'>
                <div className='ChannelLogo'>
                    <div style={{ background: `url(${channelData !== null && channelData.thumbnails.high.url}) no-repeat center center/cover` }}></div>
                </div>
                <div className='titles'>
                    <p className='VideoTitle'>{`${props.video.snippet.title}`}</p>
                    <p className='ChannelName'><span>{props.video.snippet.channelTitle}</span><i className='tich'></i></p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default VideoCard
