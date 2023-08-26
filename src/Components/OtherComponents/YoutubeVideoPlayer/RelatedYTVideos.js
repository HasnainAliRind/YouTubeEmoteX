import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentVideo } from '../../../ReduxStore/ReduxSlice';
import Spinner from '../Spinner'


function RelatedYTVideos(props) {
  let dispatch = useDispatch();
  let currentVideo = useSelector((state) => state.videosData.currentVideo);
  let [searchedVideosData, setSearchedVideosData] = useState(null)
  let [loading, setLoading] = useState(false)
  let [tags, setTags] = useState("PopularVideos")

  let addToHistory = (video) => {
    let id = video.id.videoId
    let history = localStorage.getItem("youtube_videos_history");
    if (history !== null) {
      let youtube_videos_history = JSON.parse(localStorage.getItem("youtube_videos_history"));
      let is_Already_Present = youtube_videos_history.some((item) => item.id.videoId === id);
      if (is_Already_Present) {
        let newArray = youtube_videos_history.filter((item) => item.id.videoId !== id)
        newArray.unshift(video)
        localStorage.setItem("youtube_videos_history", JSON.stringify(newArray))
      } else {
        youtube_videos_history.unshift(video);
        localStorage.setItem("youtube_videos_history", JSON.stringify(youtube_videos_history))
      }
    } else {
      let history_array = []
      history_array.push(video);
      localStorage.setItem("youtube_videos_history", JSON.stringify(history_array))
    }
  }

 

  useEffect(() => {
    if (currentVideo !== null) {
      setLoading(true)
      let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${currentVideo.id.videoId}&key=${props.api_key}`
      fetch(url).then((result) => {
        return result.json()
      }).then((data) => {
        if (data) {
         
          setLoading(false)
          data.items[0].snippet.tags[0] !== undefined && setTags(data.items[0].snippet.tags[0]) 
        }else{
          setTags("popular videos")
        }
      
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [currentVideo])


  useEffect(() => {
    if (tags !== null) {
      setLoading(true)
      
      let url = `https://www.googleapis.com/youtube/v3/search?key=${props.api_key}&part=snippet&maxResults=20&type=video&q=${tags}`
      fetch(url).then((result) => {
        return result.json()
      }).then((data) => {
        data.error == undefined &&
          setSearchedVideosData(data.items)
          setLoading(false)
      
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [tags])


  
  return (
    <div className='relatedVideos'>
       {
        
            searchedVideosData !== null && searchedVideosData.map((video)=>{
              return <div key={video.id.videoId} onClick={()=>{
                dispatch(setCurrentVideo(video))
                addToHistory(video);
              }}>
                <div className='Thumbnail' style={{background: `url(${video.snippet.thumbnails.high.url}) no-repeat center center/cover`}}></div>
                <div className='information'>
                  <p className='title'>{`${video.snippet.title}`.slice(0,50)}</p>
                  <p className='channelName'>{video.snippet.channelTitle}</p>
                </div>
              </div>
            }) 
        }
        {
          searchedVideosData == null && <Spinner/>
        } 
    </div>
  )
}

export default RelatedYTVideos