import React, { useEffect, useState } from 'react'
import RelatedYTVideos from './RelatedYTVideos'
import './VideoPlayingSection.css'
import { useSelector } from 'react-redux'
import FourZeroFourPage from '../FourZeroFourPage'


function YTVideoPlayer(props) {

  let currentVideo = useSelector((state) => state.videosData.currentVideo);
  let [videoStatus, setVideoStatus] = useState(false);
  let [channelData , setChannelData] = useState(null);

  
  useEffect(() => {
    if (currentVideo == null) {
      setVideoStatus(false)
    } else {
      setVideoStatus(true)
      const CHANNEL_ID = `${currentVideo.snippet.channelId}`;
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
    }
  }, [currentVideo])

  return (
    videoStatus == true ? <div className='VideoPlayingSection'>
      <div className='playing_video'>
        <iframe
          width="100%"
          height="380"
          src={`https://www.youtube.com/embed/${currentVideo.id.videoId}`}
          frameBorder="0"
          style={{ textAlign: 'center' }}
          allowFullScreen
          title="YouTube Video Player"
        ></iframe>
        <div className='title'>
          <p>{currentVideo.snippet.title}</p>
        </div>
        <div className='options'>
          <div className='channelIcon'>
            <div style={{ width: '15%' }}><img src={channelData !== null ? channelData.thumbnails.high.url : "https://e0.pxfuel.com/wallpapers/397/55/desktop-wallpaper-grey-background-gray-color.jpg"} alt='icon' style={{ width: "35px", borderRadius: "50%" }} /></div>
            <h4>{currentVideo.snippet.channelTitle}</h4>
          </div>
        </div>
      </div>
      <RelatedYTVideos api_key={props.api_key}/>
    </div> : <FourZeroFourPage title="Page is not available"/>
  )
}

export default YTVideoPlayer
