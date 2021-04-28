import './VideoItem.scss'
import { Video } from './App';
import VideoListItem from './VideoListItem';
import VideoGridItem from './VideoGridItem';

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

    return(
            <div className='video-item-container'>
                {isListView?
                    <VideoListItem 
                        videoDetails={videoDetails}
                        handleVideoFavorite={handleVideoFavorite}
                        removeVideo={removeVideo}
                        setDisplayVideo={setDisplayVideo}
                    />
                    :
                    <VideoGridItem 
                        videoDetails={videoDetails}
                        handleVideoFavorite={handleVideoFavorite}
                        removeVideo={removeVideo}
                        setDisplayVideo={setDisplayVideo}
                    /> 
                }
                
            </div>
    )

}

export default VideoItem;