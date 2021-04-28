import './VideoGridItem.scss'
import { Video } from './App';
import {IoMdThumbsUp, IoMdHeart, IoMdHeartEmpty, IoMdPlay, IoMdClose} from "react-icons/io";
import { useState } from 'react';

type Props = {
    videoDetails: Video,
    handleVideoFavorite: (videoItem: Video) => void,
    removeVideo: (videoItem: Video) => void,
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void
}

const VideoGridItem: React.FC<Props> = ({videoDetails, handleVideoFavorite, removeVideo, setDisplayVideo}) => {
    
    const [isPlayButton, setIsPlayButton] = useState<boolean>(false);

    return(
        <div className='video-item-grid'>
            <div className='favorite-box'>
                    <button title='remove' className='svg-button' onClick = {() => handleVideoFavorite(videoDetails)}>{videoDetails.favorite? <IoMdHeart color='#f04d4d' /> : <IoMdHeartEmpty />}</button>
                    <button title='remove' className='svg-button' onClick={()=> removeVideo(videoDetails)}><IoMdClose /></button>
            </div>
            <button className='video-thumbnail' onMouseOver={() => setIsPlayButton(true)} onMouseLeave={() => setIsPlayButton(false)} onClick={() => setDisplayVideo({isModalDisplayed: true, video: videoDetails})}>
                        <img src={videoDetails.thumbnail} alt='thumbnail'></img>
                        <IoMdPlay className={isPlayButton? 'play-button' : 'play-button hidden'}/>
            </button>
            <div className='video-info-container'>
                <div className='video-info'>
                    <div className='video-title'>
                        <h4>{videoDetails.title}</h4>
                        <div className='video-tags'>
                            <p className={`source-${videoDetails.source}`}>{videoDetails.source}</p>
                            <p>{videoDetails.addedOn}</p>
                        </div>
                    </div>
                    <div className='video-stats'>
                        <div className='stat-box'>
                            <IoMdPlay />
                            <p>{videoDetails.viewCount? videoDetails.viewCount : '- - - - -'}</p>
                        </div>
                        <div className='stat-box'>
                            <IoMdThumbsUp />
                            <p>{videoDetails.likeCount}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoGridItem