import './VideoItem.scss'
import { Video } from './App';
import { Row, Col, Button } from 'reactstrap';
import {IoMdThumbsUp, IoMdHeart, IoMdHeartEmpty, IoMdPlay, IoMdClose} from "react-icons/io";
import { useState } from 'react';

type Props = {
    videoDetails: Video,
    handleVideoFavorite: (videoItem: Video) => void
    removeVideo: (videoItem: Video) => void,
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void,
    isListView: boolean
}

const VideoItem: React.FC<Props> = ({videoDetails, handleVideoFavorite, removeVideo, setDisplayVideo, isListView}) => {

    const [isPlayButton, setIsPlayButton] = useState<boolean>(false);

    return(
            <div className='video-item-container'>
                {isListView?
                    <div className='video-item-list'>
                        <Row className='row'>
                            <Col xs='12' md='4' lg='2'>
                                <div className='video-thumbnail' onMouseOver={() => setIsPlayButton(true)} onMouseLeave={() => setIsPlayButton(false)} onClick={() => setDisplayVideo({isModalDisplayed: true, video: videoDetails})}>
                                    <img src={videoDetails.thumbnail} alt='thumbnail'></img>
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
                    :
                    <div className='video-item-grid'>
                        <div className='favorite-box'>
                                {videoDetails.favorite? <IoMdHeart color='#f04d4d' onClick = {() => handleVideoFavorite(videoDetails)}/> : <IoMdHeartEmpty onClick = {() => handleVideoFavorite(videoDetails)}/>}
                                <IoMdClose onClick={()=> removeVideo(videoDetails)}/>
                        </div>
                        <div className='video-thumbnail' onMouseOver={() => setIsPlayButton(true)} onMouseLeave={() => setIsPlayButton(false)} onClick={() => setDisplayVideo({isModalDisplayed: true, video: videoDetails})}>
                                    <img src={videoDetails.thumbnail} alt='thumbnail'></img>
                                    <IoMdPlay className={isPlayButton? 'play-button' : 'play-button hidden'}/>
                        </div>
                        <div className='video-info-container'>
                            <div className='video-info'>
                                <div className='video-title'>
                                    <h4>{videoDetails.title}</h4>
                                    <div className='video-tags'>
                                        <p className={`source-${videoDetails.source}`}>{videoDetails.source}</p>
                                        <p>{videoDetails.addedOn.toISOString().slice(0, 10)}</p>
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
                    
                }
                
            </div>
    )

}

export default VideoItem;