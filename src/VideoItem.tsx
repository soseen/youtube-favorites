import './VideoItem.scss'
import { Video } from './App';
import { Container, Row, Col } from 'reactstrap';
import {IoMdThumbsUp, IoMdThumbsDown, IoMdHeart, IoMdHeartEmpty, IoIosHeartDislike, IoMdPlay, IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

type Props = {
    videoDetails: Video
}

const VideoItem: React.FC<Props> = ({videoDetails}) => {

    console.log('^^^^^^^^^^^^^^^^^^^^');
    console.log(videoDetails);

    return(
            <div className='video-item-container'>
                <Row>
                    <Col xs='12' md='3'>
                        <div className='video-thumbnail'>
                            <img src={videoDetails.thumbnail}></img>
                        </div>
                    </Col>
                    <Col xs='12' md='9'>
                        <div className='video-info-container'>
                            <div className='video-info'>
                                <div className='video-title'>
                                    <h4>{videoDetails.title}</h4>
                                    <p>{videoDetails.addedOn.toISOString().slice(0, 10)}</p>
                                </div>
                                <p className='video-desc'>{`${videoDetails.description.substring(0, 250)}...`}</p>
                                <div className='video-stats'>
                                    <div className='stat-box'>
                                        <IoMdPlay />
                                        <p>{videoDetails.viewCount}</p>
                                    </div>
                                    <div className='stat-box'>
                                        <IoMdThumbsUp />
                                        <p>{videoDetails.likeCount}</p>
                                    </div>
                                    <div className='stat-box'>
                                        <IoMdThumbsDown />
                                        <p>{videoDetails.dislikeCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='favorite-box'>
                                {videoDetails.favorite? <IoMdHeart/> : <IoMdHeartEmpty />}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
    )

}

export default VideoItem;