import './Videos.scss';
import {Video} from './App'
import VideoItem from './VideoItem';

type Props = {
    videos: Video[],
    handleVideoFavorite: (videoItem: Video) => void,
    removeVideo: (videoItem: Video) => void
}

const Videos: React.FC<Props> = ({videos, handleVideoFavorite, removeVideo}) => {

    console.log('------------------------------');
    console.log(videos);

    return(
        <div className='videos-container'>
        {videos.map((videoDetails: Video) => {
            return(
                <VideoItem key={videoDetails.id} videoDetails={videoDetails} handleVideoFavorite={handleVideoFavorite} removeVideo={removeVideo}/>
            )
        }) 
        }
    </div>
    )
}

export default Videos;