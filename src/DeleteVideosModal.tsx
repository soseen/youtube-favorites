import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { Video } from './App';
import './DeleteVideosModal.scss'

type Props = {
    isDeleteVideosModalOpen: boolean,
    setIsDeleteVideosModalOpen: (isDeleteVideosModalOpen: boolean) => void,
    setVideos: (videos: Video[]) => void
}

const deleteVideosModal: React.FC<Props> = ({isDeleteVideosModalOpen, setIsDeleteVideosModalOpen, setVideos}) => {

    const deleteVideos = () => {
        setVideos([])
        setIsDeleteVideosModalOpen(false);
    }

    return(
        <Modal size='lg' isOpen={isDeleteVideosModalOpen} toggle={() => setIsDeleteVideosModalOpen(!isDeleteVideosModalOpen)} contentClassName='video-modal'>
        <ModalHeader toggle={() => setIsDeleteVideosModalOpen(!isDeleteVideosModalOpen)}>Are you sure you want to delete all the videos?</ModalHeader>
        <ModalBody>
            <div className='modal-buttons'>
                <Button className='btn bg-primary' onClick={()=> deleteVideos()}>Yes</Button>
                <Button className='btn bg-primary' onClick={() => setIsDeleteVideosModalOpen(false)}>Cancel</Button>
            </div>
        </ModalBody>
        </Modal>
    )
}

export default deleteVideosModal;