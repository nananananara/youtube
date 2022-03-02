import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route,Link,Switch,useLocation  } from 'react-router-dom';
import Header from './components/header';
import Video from './components/video';
import Detail from './components/detail';
import './css/app.scss';



function App() {
  const API = "AIzaSyBRS4Yxw6TEFXEsSOweTU3NeKuJcl9mgh0";
  const [video,setVideo] = useState([]);
  const axiosData = async (api,setState)=> {
    await axios.get(api)
      .then((result)=>{
        setState([...result.data.items]);
        //console.log([...result.data.items]);
      })
      .catch(()=>{
        console.log("실패");
      })
  };

  const search = async (keword) => {
      const api = `https://www.googleapis.com/youtube/v3/search/?part=snippet&maxResults=30&q=${keword}&type=video&key=${API}`;
      axiosData(api,setVideo);

  };

  useEffect(()=>{
    const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=kr&maxResults=30&key=${API}`;
    axiosData(api,setVideo);
  },[])

  function timeForToday(value) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }

  return (
   <>
    
    <Header onSearch={search} />
    
    <Switch>
      <Route path="/" exact>
        
        {
          video === []
          ? null
          : <Video video={video} timeForToday={timeForToday} />
        }
      </Route>

      <Route path="/detail/:param/:chParam">
        <Detail />
      </Route>

    </Switch>
 
   </>
  );
}



export default App;


