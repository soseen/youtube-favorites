import './Videos.scss';
import {Video} from './App'
import VideoItem from './VideoItem';
import { Container, Row, Col } from 'reactstrap';

type Props = {
    videosToDisplay: Video[],
    handleVideoFavorite: (videoItem: Video) => void,
    removeVideo: (videoItem: Video) => void,
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void
    isListView: boolean
}

const Videos: React.FC<Props> = ({videosToDisplay, handleVideoFavorite, removeVideo, setDisplayVideo, isListView}) => {

    return(
        <div className='videos-container'>
            <Container fluid>
                    {isListView?
                    <div>
                            {videosToDisplay.map((videoDetails: Video) => {
                                return(
                                    <VideoItem key={videoDetails.id} videoDetails={videoDetails} handleVideoFavorite={handleVideoFavorite} removeVideo={removeVideo} setDisplayVideo={setDisplayVideo} isListView={isListView}/>
                                )}) 
                            }
                    </div>
                    :
                    <Row style={{margin: '0'}}>
                        {videosToDisplay.map((videoDetails: Video) => {
                            return(
                                <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <VideoItem key={videoDetails.id} videoDetails={videoDetails} handleVideoFavorite={handleVideoFavorite} removeVideo={removeVideo} setDisplayVideo={setDisplayVideo} isListView={isListView}/>
                                </Col>
                            )}) 
                        }   
                    </Row>
                    }
            </Container>
    </div>
    )
}

export default Videos;