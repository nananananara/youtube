import React from 'react';
import { Link,useLocation  } from 'react-router-dom';

function Video(props) {
  return (
    <div className='video'>
        <ul>
            {
                props.video.map((item,i)=>{
                    
                    let videoId = ()=>{
                        if(typeof item.id === 'string'){
                            return item.id;
                        }
                        return item.id.videoId
                    }
                    let videoIdString = videoId.toString()
                    return(
                        <li key={typeof item.id === 'string' ? item.id : item.id.videoId}>  
                            <Link to={"/detail/"+videoId()+"/"+item.snippet.channelId}>
                                <div className="thumb">
                                    <span><i className="xi-play"></i> 재생</span>
                                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title+"썸네일 이미지"} />
                                </div>
                                <div className="info">
                                    <strong>{item.snippet.title}</strong>
                                    <p>
                                        <span>{item.snippet.channelTitle}</span>
                                        <span>{props.timeForToday(item.snippet.publishedAt)}</span>
                                    </p>
                                    {/* <p>  
                                        <span>{viewLength > 4? "조회수 "+viewInfo+"만회": viewInfo2}</span>
                                        <span>{timeForToday(item.snippet.publishedAt)}</span>
                                    </p> */}
                                </div>
                            </Link> 
                        </li>
                    )
                    
                })
            }
        </ul>
    </div>
  );
}

export default Video;


