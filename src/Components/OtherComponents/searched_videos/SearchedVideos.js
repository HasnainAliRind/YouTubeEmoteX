import React, { useEffect, useState } from 'react'
import './SearchComponentCss.css'
import VideoCompo from './VideoCompo'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner.js'
function SearchedVideos(props) {

  let searchedTerm = useSelector((state)=>state.videosData.searchedTerm);
  let [searchedVideosData , setSearchedVideosData] = useState([])
  let [loading , setLoading] = useState(false)
 
  useEffect(()=>{
        setLoading(true)
        let url = `https://www.googleapis.com/youtube/v3/search?key=${props.api_key}&part=snippet&maxResults=20&type=video&q=${searchedTerm}`
        fetch(url).then((result) => {
            return result.json()
        }).then((data) => {
          data.error == undefined &&
          setSearchedVideosData(data.items)
          setLoading(false)
        }).catch(()=>{
            // setLoading(false)
            
        })
  },[searchedTerm])
  

  return (
    <div className='searched_videos'>
      {
        !loading && 
        <div className='videos'>
          {
            searchedVideosData.map((video)=>{
              return <VideoCompo video={video} key={video.id.videoId} api_key={props.api_key}/>
            })
          }
        </div> 
      }
      {
        loading && <Spinner/>
      }
    </div>
  )
}

export default SearchedVideos
