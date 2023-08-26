import React , { useEffect, useState } from 'react'
import data from '../API_Sample.json'
import Section from './Section';


function AllSection() {

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
    <div className='leftSide'>
        <Section classOf="History" title="History" link="/my-history" items={items}/>
    </div>
  )
}

export default AllSection
