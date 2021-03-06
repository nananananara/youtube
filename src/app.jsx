import axios from 'axios';
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Route,Link,Switch,useLocation  } from 'react-router-dom';
import Header from './components/header';
import Video from './components/video';
import './css/app.scss';

//import Detail from './components/detail';
const Detail = lazy(()=>{return import('./components/detail')});

function App(props) {
  const API = process.env.REACT_APP_YOUTUBE_API_KEY;
  const [video,setVideo] = useState([]);
  const [mode,setMode] = useState('light');
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
   <div className={"App "+(mode === 'light' ? 'light' : 'dark')}>
  
    <Header onSearch={search} mode={mode} setMode={setMode} />
    
    <Switch>
      <Route path="/" exact>
        
        {
          video === []
          ? null
          : <Video video={video} timeForToday={timeForToday} />
        }
      </Route>

      <Route path="/detail/:param/:chParam">
        <Suspense fallback={<div>로딩중이에요</div>}>
          <Detail timeForToday={timeForToday} />
        </Suspense>
      </Route>

    </Switch>
 
   </div>
  );
}



export default App;


