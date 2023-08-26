import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentVideo, setHomePageStyles } from '../../../ReduxStore/ReduxSlice'

function Section(props) {


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

  return (
    <div className={props.classOf}>
            <p className='title'>
                <span>{props.title}</span>
                {
                  props.items !== null && <button><Link to={props.link}>See all</Link></button>
                }
            </p>
            {
            props.items !== null &&
            <div className='videos'>
                {
                     props.items.map((video)=>{
                        return <Link to="/videos" key={video.id.videoId} onClick={()=>{
                            dispatch(setCurrentVideo(video))
                            addToHistory(video);
                            screenSize > 920 && dispatch(setHomePageStyles(false))
                        }}>
                         <div className='video'>
                            <div className="thumbnail" style={{background: `url(${video.snippet.thumbnails.high.url}) no-repeat center center/cover`}}></div>
                            <div className='title'>{`${video.snippet.title}`.length > 40 ? video.snippet.title.slice(0,40) + "..." : video.snippet.title}</div>
                            <div className='channel'>{video.snippet.channelTitle}</div>
                        </div>
                        </Link>
                    })
                  }
            </div>
          }
    </div>
  )
}

export default Section
