import React, { useEffect, useState } from 'react'
import VideoCard from '../VideoUI/VideoCard'
import './Subscription.css'
import Spinner from '../Spinner'

function Subscription(props) {

  let [searchedVideosData , setSearchedVideosData] = useState(null)
  let [loading , setLoading] = useState(false)


  useEffect(()=>{
    let timer = setTimeout(() => {
      setLoading(true)
      let url = `https://www.googleapis.com/youtube/v3/search?key=${props.api_key}&part=snippet&maxResults=20&type=video&q=informative-videos`
      fetch(url).then((result) => {
          return result.json()
      }).then((data) => {
        data.error == undefined &&
        setSearchedVideosData(data.items)
        setLoading(false)
         
      }).catch(()=>{
          setLoading(false)
      })
  }, 800);
  return ()=>clearTimeout(timer)
  },[])

  return (
    <div className='Subscripiton_Section'>
        <div className='title'>
            <p>Latest</p>
        </div>
        <div className='videos'>
            {
               searchedVideosData !== null && searchedVideosData.map((video)=>{
                return <VideoCard video={video} key={video.id.videoId} api_key={props.api_key}/>
              })
            }
              {
              searchedVideosData == null && <Spinner/>
              }
        </div>
    </div>
  )
}

export default Subscription
