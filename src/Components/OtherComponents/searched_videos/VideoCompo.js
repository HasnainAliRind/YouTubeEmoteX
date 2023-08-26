import React, { useEffect, useState } from 'react'
import image from './ChannelImg.jpg'
import { Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVideo, setHomePageStyles } from '../../../ReduxStore/ReduxSlice';


function VideoCompo(props) {

  let dispatch = useDispatch()
  let screenSize = useSelector((state)=>state.videosData.screenSize)
  let addToHistory = (video) =>{
    let id = video.id.videoId
    let history = localStorage.getItem("youtube_videos_history");
    if (history !== null) {
      let youtube_videos_history = JSON.parse(localStorage.getItem("youtube_videos_history"));
      let is_Already_Present = youtube_videos_history.some((item)=>item.id.videoId === id);
   
      if (is_Already_Present) {
    
        let newArray = youtube_videos_history.filter((item)=>item.id.videoId !== id)
        newArray.unshift(video)
        localStorage.setItem("youtube_videos_history",JSON.stringify(newArray))
      }else{
       
        youtube_videos_history.unshift(video);
        localStorage.setItem("youtube_videos_history",JSON.stringify(youtube_videos_history))
      }
    }else{
      let history_array = []
      history_array.push(video);
      localStorage.setItem("youtube_videos_history",JSON.stringify(history_array))
    }
  }
  let [channelData , setChannelData] = useState(null);
  useEffect(()=>{
    const CHANNEL_ID = `${props.video.snippet.channelId}`;
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${props.api_key}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0].snippet);
      } else {
        console.error("Channel data not found.");
      }
    })
    .catch((error) => console.error("Error fetching channel data:", error));

  }, [props])


  return (
    <Link to="/videos" onClick={()=>{
       dispatch(setCurrentVideo(props.video))  
      addToHistory(props.video);

      screenSize > 920 && dispatch(setHomePageStyles(false))
    }}><div className='video'>
        <div className='thumbnail' style={{background:  `url(${props.video.snippet.thumbnails.high.url}) no-repeat center center/cover`}}></div>
        <div className='information'>
          <p className='title'>{props.video.snippet.title}</p>
          <div className='channel'>
            <img src={channelData !== null ? channelData.thumbnails.high.url : undefined} alt='notFounding'/>
            <p>{props.video.snippet.channelTitle}</p>
          </div>
        </div>
    </div>
    </Link>
  )
}

export default VideoCompo
