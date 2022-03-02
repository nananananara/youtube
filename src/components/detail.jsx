import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams} from 'react-router-dom';

function Detail() {
    const API = "AIzaSyBRS4Yxw6TEFXEsSOweTU3NeKuJcl9mgh0";
    let history = useHistory();
    let { param } = useParams();
    let {chParam} = useParams();
    let [view,setView] = useState();
    let [chnnelInfo,setChnnelInfo] = useState();
    const axiosDataDetail = async (api, state)=> {
        await axios.get(api)
          .then((result)=>{
            state(result.data.items);
            console.log(result.data.items);
          })
          .catch(()=>{
            console.log("실패");
          })
    };

    useEffect(()=>{
        const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${param}&key=${API}`
        const channelApi = `https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${chParam}&key=${API}`;
        axiosDataDetail(api,setView);
        axiosDataDetail(channelApi,setChnnelInfo);

    },[])
   
    let viewCount = ()=> {
        let viewnum = view[0].statistics.viewCount;
        let viewnumInfo = Number(viewnum).toLocaleString();
        return viewnumInfo
    }

    let date = ()=> {
        let viewDate = view[0].snippet.publishedAt;
        return viewDate.substring(0,10)
    }

    let [more,setMore] = useState('false');

    return (
        <div className='detail layout'>
            
        {
            view === undefined
            ? null
            :
            <>
            <div className='detail-left'>
                <iframe src={`https://www.youtube.com/embed/${view[0].id}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <div className="info">
                    <strong>{view[0].snippet.title}</strong>
                    <p>
                        <span>조회수 {viewCount()}회</span>
                        <span>{date()}</span>
                    </p>
                </div>

                <div className="channel">
                    <div className="thumb">
                        {
                            chnnelInfo === undefined
                            ? null
                            : <img src={chnnelInfo[0].snippet.thumbnails.default.url} alt={view[0].snippet.channelTitle} />
                        }
                    </div>
                    <strong>{view[0].snippet.channelTitle}</strong>
                    <div className={`content ${more===true? 'moreActive' : 'more'}`}> 
                        <pre className='description'>{view[0].snippet.description}</pre>
                    </div>
                    <button onClick={()=>{setMore(!more)}}>
                        {
                            more === true
                            ? '간략히'
                            : '더보기'
                        }
                    </button>
                    
                    
                </div>
            </div>
            
            <div className='detail-right'></div>   
            </>
        }
        </div>
    );
}

export default Detail;


