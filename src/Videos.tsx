import './Videos.scss';
import {Video} from './App'
import VideoItem from './VideoItem';

type Props = {
    videosToDisplay: Video[],
    handleVideoFavorite: (videoItem: Video) => void,
    removeVideo: (videoItem: Video) => void,
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void
}

const Videos: React.FC<Props> = ({videosToDisplay, handleVideoFavorite, removeVideo, setDisplayVideo}) => {

    return(
        <div className='videos-container'>
        {videosToDisplay.map((videoDetails: Video) => {
            return(
                <VideoItem key={videoDetails.id} videoDetails={videoDetails} handleVideoFavorite={handleVideoFavorite} removeVideo={removeVideo} setDisplayVideo={setDisplayVideo}/>
            )
        }) 
        }
    </div>
    )
}

export default Videos;