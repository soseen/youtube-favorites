import { Video } from './App'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ReactPlayer from 'react-player'

type Props = {
    displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    },
    setDisplayVideo: (displayVideo: {
        isModalDisplayed: boolean,
        video?: Video
    }) => void
}

const VideoModal: React.FC<Props> = ({displayVideo, setDisplayVideo}) => {

    return(
        <Modal size='lg' isOpen={displayVideo.isModalDisplayed} toggle={()=> setDisplayVideo({...displayVideo, isModalDisplayed: !displayVideo.isModalDisplayed})} contentClassName='video-modal'>
            <ModalHeader toggle={()=> setDisplayVideo({...displayVideo, isModalDisplayed: !displayVideo.isModalDisplayed})}>{displayVideo.video?.title}</ModalHeader>
            <ModalBody>
                <ReactPlayer url={displayVideo.video?.watchURL} controls={true} style={{margin: 'auto', width: '100%', height: 'auto', maxWidth: '100%'}}/>
            </ModalBody>
        </Modal>
    )
}

export default VideoModal