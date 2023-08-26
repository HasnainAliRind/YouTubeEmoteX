import React, { useEffect, useState } from 'react'
import VideoCompo from '../searched_videos/VideoCompo'
import './History.css'


function History(props) {

  let[items , setItems] = useState(null)

  useEffect(()=>{
    let history = localStorage.getItem("youtube_videos_history");
    if (history !== null) {
      let historyVideo = JSON.parse(history);
      let showTheVideos = historyVideo.filter((item , index)=>index<6)
      setItems(showTheVideos);
    }else{
      setItems(null)
    }
  } , [])

  return (
    <div className="History_Component">
      <h2>History</h2>
        <div className='videos'>
           {
            items !== null &&  
              items.map((video)=>{
                  return <VideoCompo video={video} key={video.id.videoId} api_key={props.api_key}/>
              })
           }
        </div>
    </div>
  )
}

export default History
