import React, { useEffect, useState } from 'react'
import './Mood.css'
import image from './mood.png'
import { useSelector, useDispatch } from 'react-redux'
import { setMood, setSelectBox, setSelectedCategory } from '../../../ReduxStore/ReduxSlice'

import VideoCard from '../VideoUI/VideoCard'
import Spinner from '../Spinner'

function Mood(props) {

    let MoodArray = [
        {
            name: "Happy",
            imgSrc: image,
            onChoosing: () => {
                setMood("Happy")
            },
            background: "pink"
        }
        ,
        {
            name: "Sad",
            imgSrc: image,
            onChoosing: () => {
                setMood("Sad")
            },
            background: "cyan"
        }
        ,
        {
            name: "Bored",
            imgSrc: image,
            onChoosing: () => {
                setMood("Funny")
            },
            background: "yellow"
        }
        ,
        {
            name: "Angry",
            imgSrc: image,
            onChoosing: () => {
                setMood("angry")
            },
            background: "red"
        }
        ,
        {
            name: "Curious",
            imgSrc: image,
            onChoosing: () => {
                setMood("good")
            },
            background: "green"
        }


    ]
    const moodRecommendations = [
        {
            mood: "Happy",
            recommendations: [
                "Comedy",
                "Uplifting Music",
                "Cute Animals",
                "Travel Vlogs",
                "Dance Performances",
                "Cooking Shows",
                "Funny Memes",
                "Outdoor Adventures",
                "Positive News",
                "Hilarious Sketches",
                "Gardening Tips",
                "DIY Craft Ideas",
                "Nature Walks",
                "Family Gatherings",
                "Feel-Good Movies"
            ]
        },
        {
            mood: "Sad",
            recommendations: [
                "Comforting Talks",
                "Inspirational Stories",
                "Emotional Support Animals",
                "Soothing Music",
                "Healing Narratives",
                "Self-Care Tips",
                "Virtual Hugs",
                "Mindfulness Meditation",
                "Empathy Stories",
                "Kindness Videos",
                "Hopeful Quotes",
                "Nostalgic Moments",
                "Warm Hugs",
                "Gentle Poetry",
                "Rainy Day Movies"
            ]
        },
        {
            mood: "Angry",
            recommendations: [
                "Anger Management Techniques",
                "Empathy Talks",
                "Motivational Talks",
                "Comedy",
                "Positive Change Stories",
                "Conflict Resolution",
                "Understanding Perspectives",
                "Calm Your Mind",
                "Peaceful Music",
                "Breathing Exercises",
                "Transformation Stories",
                "Forgiveness Stories",
                "Laughter Therapy",
                "Turning Negatives into Positives",
                "Hilarious Stand-Up Comedy"
            ]
        },
        {
            mood: "Bored",
            recommendations: [
                "DIY Projects",
                "Interactive Quizzes",
                "Travel Documentaries",
                "Comedy Sketches",
                "Creative Art Tutorials",
                "Virtual Tours",
                "Brain Teasers",
                "Learning New Skills",
                "Exploring New Music",
                "Online Workshops",
                "Unusual Facts",
                "Storytelling Sessions",
                "Unboxing Videos",
                "Virtual Adventures",
                "Historical Mysteries"
            ]
        },
        {
            mood: "Curious",
            recommendations: [
                "Educational Documentaries",
                "Scientific Discoveries",
                "Philosophical Discussions",
                "Investigative Journalism",
                "Historical Analyses",
                "Space Exploration",
                "Critical Thinking",
                "Debunking Myths",
                "Deep Dives",
                "Understanding Cultures",
                "Exploring Art Movements",
                "Social Experiments",
                "Psychological Studies",
                "Technological Innovations",
                "Exploring The Unknown"
            ]
        }
    ];



    let dispatch = useDispatch();

    let moodDetails = useSelector((state) => state.videosData.moodDetails)
    let selectBox = useSelector((state) => state.videosData.selectBox);
    let [loading, setLoading] = useState(false)
    let [searchedVideosData, setSearchedVideosData] = useState([])
    let selectedCatergory = useSelector((state) => state.videosData.selectedCatergory)


    useEffect(() => {
        if (moodDetails.mood !== "") {
            moodRecommendations.forEach((recommendations, index) => {
                if (recommendations.mood === moodDetails.mood) {
                    dispatch(setSelectBox(false))
                    dispatch(setSelectedCategory(recommendations.recommendations[0]));
                }
            })
        }
    }, [moodDetails])

    useEffect(() => {
        if (selectedCatergory !== null) {
            let timer = setTimeout(() => {
                setLoading(true)
                let url = `https://www.googleapis.com/youtube/v3/search?key=${props.api_key}&part=snippet&maxResults=20&type=video&q=${selectedCatergory}`
                fetch(url).then((result) => {
                    return result.json()
                }).then((data) => {
                    data.error == undefined &&
                    setSearchedVideosData(data.items)
                    setLoading(false)
                }).catch(() => {
                    // setLoading(true)
                   
                })
            }, 800);
            return () => clearTimeout(timer)
        }
    }, [selectedCatergory])

    return (
        <div className='Mood_Section'>
            <div className='upperPart'>
                <span>{!selectBox ? "Recommended" : "Choose Your Mood!"}</span>
                <button onClick={() => {
                    dispatch(setSelectBox(true))
                }}>Set Mood</button>
            </div>
            {
                selectBox &&

                <div className='moodBox'>
                    <p className='title'>How you're feeling?</p>
                    <div className='moods_list'>
                        {
                            MoodArray.map((mood) => {
                                return <div key={mood.name} onClick={() => {
                                    let recommendations = moodRecommendations.filter((each) => each.mood === mood.name)
                                    dispatch(setMood({ mood: mood.name, Recommended: recommendations[0].recommendations }))
                                    dispatch(setSelectBox(false))

                                }}>
                                    <div className='background' style={{ background: mood.background }}></div>
                                    <img src={mood.imgSrc}></img>
                                    <p>{mood.name}</p>
                                </div>
                            })
                        }
                    </div>
                </div>
            }





            {/* Dynamic data */}
          {!loading ?

                !selectBox && <div className='recommendedVideos'>
                    <div className='Categories'>
                        {
                            moodDetails.Recommended.map((category) => {
                                return category !== selectedCatergory && <div className='category' key={category} onClick={() => {
                                    dispatch(setSelectedCategory(category))
                                }}>{category}</div>
                            })
                        }
                    </div>
                    <div className='videos' style={{ justifyContent: 'center', gap: "30px" }}>{
                        searchedVideosData !== null ? searchedVideosData.map((video) => {
                            return <VideoCard video={video} key={video.id.videoId} api_key={props.api_key}/>
                        }) : <Spinner />
                    }</div>
                </div> : <Spinner />
            } 

        </div>
    )
}

export default Mood
