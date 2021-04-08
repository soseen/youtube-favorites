import './VideoItem.scss'
import { Video } from './App';
import { Container, Row, Col, Button } from 'reactstrap';
import {IoMdThumbsUp, IoMdThumbsDown, IoMdHeart, IoMdHeartEmpty, IoIosHeartDislike, IoMdPlay, IoMdClose} from "react-icons/io";
import { useState } from 'react';
import Videos from './Videos';

type Props = {
    videoDetails: Video,
    handleVideoFavorite: (videoItem: Video) => void
    removeVideo: (videoItem: Video) => void,
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void
}

const VideoItem: React.FC<Props> = ({videoDetails, handleVideoFavorite, removeVideo, setDisplayVideo}) => {

    const [isPlayButton, setIsPlayButton] = useState<boolean>(false);
    // const [isFavoriteButton, setIsFavoriteButton] = useState<boolean>(false);


    return(
            <div className='video-item-container'>
                <Row className='row'>
                    <Col xs='12' md='4' lg='2'>
                        <div className='video-thumbnail' onMouseOver={() => setIsPlayButton(true)} onMouseLeave={() => setIsPlayButton(false)} onClick={() => setDisplayVideo({isModalDisplayed: true, video: videoDetails})}>
                            <img src={videoDetails.thumbnail}></img>
                            <IoMdPlay className={isPlayButton? 'play-button' : 'play-button hidden'}/>
                        </div>
                    </Col>
                    <Col xs='12' md='8' lg='10'>
                        <div className='video-info-container'>
                            <div className='video-info'>
                                <div className='video-title'>
                                    <h4>{videoDetails.title}</h4>
                                    <div className='video-tags'>
                                        <p className={`source-${videoDetails.source}`}>{videoDetails.source}</p>
                                        <p>{videoDetails.addedOn.toISOString().slice(0, 10)}</p>
                                    </div>
                                </div>
                                <p className='video-desc'>{`${videoDetails.description.substring(0, 250)}...`}</p>
                                <div className='video-stats'>
                                    <div className='stat-box'>
                                        <IoMdPlay />
                                        <p>{videoDetails.viewCount? videoDetails.viewCount : '- - - - -'}</p>
                                    </div>
                                    <div className='stat-box'>
                                        <IoMdThumbsUp />
                                        <p>{videoDetails.likeCount}</p>
                                    </div>
                                    <Button className='remove-video-btn btn-danger' onClick={()=> removeVideo(videoDetails)}>Remove</Button>
                                </div>
                            </div>
                            <div className='favorite-box' onClick = {() => handleVideoFavorite(videoDetails)}>
                                {videoDetails.favorite? <IoMdHeart color='#f04d4d' /> : <IoMdHeartEmpty />}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
    )

}

export default VideoItem;