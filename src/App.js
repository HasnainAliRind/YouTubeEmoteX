import './App.css';
import Navbar from './Components/navigation/Navbar';
import HomePage from './Components/OtherComponents/HomePage';
import SideBar from './Components/navigation/SideBar';
import { useEffect, useState } from 'react';
import Shadow from './Components/navigation/Shadow';
import { useDispatch , useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { setAPIKey } from './ReduxStore/ReduxSlice';
function App() {

  let [ sidebarStatus , setSideBarStatus] = useState(false)
  let mobileSearch = useSelector((state)=>state.videosData.mobileSearch)
  let shadow = useSelector((state)=>state.videosData.shadow)
  let api_key = process.env.REACT_APP_YOUTUBE_API_KEY
 


  return (
    <div className="App">
      <Router>
      {
      mobileSearch.status !== true && <Navbar/>
      }
      <SideBar/>
      {
        shadow && <Shadow/>
      }
      <HomePage api_key={api_key}/>
      </Router>
    </div>
  );
}

export default App;
