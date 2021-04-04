import './Videos.scss';
import {Video} from './App'
import VideoItem from './VideoItem';

type Props = {
    videos: Video[] | []
}

const Videos: React.FC<Props> = ({videos}) => {

    console.log('------------------------------');
    console.log(videos);

    return(
        <div className='videos-container'>
        {videos.map((videoDetails: Video) => {
            return(
                <VideoItem videoDetails={videoDetails} />
            )
        }) 
        }
    </div>
    )
}

export default Videos;