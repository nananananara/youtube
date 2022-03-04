import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams ,useLocation} from 'react-router-dom';

function Detail(props) {
    let location = useLocation ();
    let locationPath = location.pathname;
    let [url,setUrl] = useState();

    const API = process.env.REACT_APP_YOUTUBE_API_KEY;
    let history = useHistory();
    let { param } = useParams();
    let {chParam} = useParams();
    let [view,setView] = useState();
    let [chnnelInfo,setChnnelInfo] = useState();
    let [comment,setComment] = useState();
    let [list,setList] = useState();
    
    const axiosDataDetail = async (api, state)=> {
        await axios.get(api)
          .then((result)=>{
            state(result.data.items);
            //console.log(result.data.items);
          })
          .catch(()=>{
            console.log("실패");
          })
    };

    useEffect(()=>{
        const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${param}&key=${API}`
        const channelApi = `https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${chParam}&key=${API}`;
        const commntApi = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&videoId=${param}&key=${API}`
        const listApi = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${chParam}&maxResults=30&key=${API}`
        
        axiosDataDetail(api,setView);
        axiosDataDetail(channelApi,setChnnelInfo);
        axiosDataDetail(commntApi,setComment);
        axiosDataDetail(listApi,setList);

    },[])

    useEffect(()=>{
        window.scrollTo(0,0);
        const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${param}&key=${API}`
        const channelApi = `https://www.googleapis.com/youtube/v3/channels?part=snippet&part=statistics&id=${chParam}&key=${API}`;
        const commntApi = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&order=relevance&videoId=${param}&key=${API}`
        const listApi = `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&channelId=${chParam}&maxResults=30&key=${API}`
        
        axiosDataDetail(api,setView);
        axiosDataDetail(channelApi,setChnnelInfo);
        axiosDataDetail(commntApi,setComment);
        axiosDataDetail(listApi,setList);
    },[locationPath])
   
    let viewCount = ()=> {
        let viewnum = view[0].statistics.viewCount;
        let viewnumInfo = Number(viewnum).toLocaleString();
        return viewnumInfo
    }

    let date = ()=> {
        let viewDate = view[0].snippet.publishedAt;
        return viewDate.substring(0,10)
    }

    let commentCount = ()=> {
        let viewnum = view[0].statistics.commentCount;
        let viewnumInfo = Number(viewnum).toLocaleString();
        return viewnumInfo
    }

    let likeCount = (i)=> {
        let viewnum = comment[i].snippet.topLevelComment.snippet.likeCount;
        let viewnumInfo = Number(viewnum).toLocaleString();
        return viewnumInfo
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
                <iframe 
                    src={`https://www.youtube.com/embed/${view[0].id}`} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
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

                <div className="comment">
                    <div className="tit">
                        댓글
                        {
                            view === undefined
                            ? null
                            :<span> {commentCount()}개</span>
                        }
                    </div>
                    <ul>
                        {
                            comment === undefined
                            ? null
                            :comment.map((item,i)=>{
                                return(
                                    <li key={item.id}>
                                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                        <strong>
                                            {item.snippet.topLevelComment.snippet.authorDisplayName}
                                            <span>{props.timeForToday(item.snippet.topLevelComment.snippet.publishedAt)}</span>
                                        </strong>
                                        <pre>{item.snippet.topLevelComment.snippet.textOriginal}</pre>
                                        <p>
                                            <i className="xi-thumbs-up"></i>
                                            {likeCount(i)}
                                        </p>
                                    </li>
                                )
                            })

                        }
                    </ul>
                </div>
            </div>
            
            <div className='detail-right'>
                <div className="videoList">
                    {
                        list === undefined
                        ? null
                        :
                        <ul>
                            {list.map((item,i)=>{
                                return(
                                <li key={item.contentDetails.upload.videoId}>
                                    <Link to={"/detail/"+item.contentDetails.upload.videoId+"/"+item.snippet.channelId}>
                                    <div className="thumb">
                                        <span><i className="xi-play"></i> 재생</span>
                                        <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                                    </div>
                                    <div className="info">
                                        <strong>{item.snippet.title}</strong>
                                        <p>{item.snippet.channelTitle}</p>
                                        <p>{props.timeForToday(item.snippet.publishedAt)}</p>
                                    </div>
                                    </Link>
                                </li>
                                )
                            })}
                            
                        </ul>  
                    }
                </div>
            
            </div>   
            </>
        }
        <div className="btn">
            <Link to="/">메인으로 이동</Link>
        </div>
        </div>
    );
}

export default Detail;


