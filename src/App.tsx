import './App.scss';
import { useEffect, useMemo, useState } from 'react';
import { Spinner } from 'reactstrap';
// import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import Navigation from './Navigation';
import Videos from './Videos'
import VideoModal from './VideoModal';
import DeleteVideosModal from './DeleteVideosModal';
import 'bootstrap/dist/css/bootstrap.css';
import { compareAsc, compareDesc, isBefore, parseISO } from 'date-fns';
import { parseJSON } from 'date-fns/esm';

export type Video = {
  id: string,
  title: string,
  description: string,
  viewCount?: number | undefined,
  likeCount: number,
  dislikeCount?: number | undefined,
  thumbnail: string,
  addedOn: string,
  favorite: boolean,
  source: string,
  watchURL: string
};

const App = () => {

  const [videos, setVideos] = useState<Video[]>(JSON.parse(localStorage.getItem('videosData') || '[]'));
  const [isFavoritesDisplayed, setIsFavoritesDisplayed] = useState<boolean>(false);
  const [isNewestFirst, setIsNewestFirst] = useState<boolean>(true);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isListView, setIsListView] = useState<boolean>(true);
  const [displayVideo, setDisplayVideo] = useState<{isModalDisplayed: boolean, video?: Video}>({isModalDisplayed: false});
  const [isDeleteVideosModalOpen, setIsDeleteVideosModalOpen] = useState<boolean>(false);



  useEffect(()=> {
    localStorage.setItem('videosData', JSON.stringify(videos));
  },[videos])

  console.log(videos);


  const videosToDisplay: Video[] = useMemo(()=> {


    let newVideos: Video[] = videos;


    if(isFavoritesDisplayed) {
      newVideos = newVideos.filter(video => video.favorite)
    }

    isNewestFirst?
    newVideos.sort((a, b) => compareDesc(parseISO(a.addedOn),parseISO(b.addedOn)))
    // : newVideos.sort((a, b) =>  Date.parse(a.addedOn) - Date.parse(b.addedOn))
    : newVideos.sort((a, b) => compareAsc(parseISO(a.addedOn),parseISO(b.addedOn)))

    return newVideos
  },[videos, isFavoritesDisplayed, isNewestFirst]);


  const handleVideoFavorite = (videoItem: Video) =>
    setVideos(
        videos.map(item =>
            item.id === videoItem.id ? { ...item, favorite: !item.favorite } : item,
        ),
    );
  
  const removeVideo = (videoItem: Video) => {

    setVideos(
      videos.reduce<Video[]>((newVideos, video) => 
        video.id === videoItem.id ? newVideos : [...newVideos, video],
        [])
    )
  }

  return (
    <div className="App">
      {isFetchingData &&
        <div className='fetching-spinner'>
          <Spinner className='spinner' color='primary'/>
        </div>
      }
      <Navigation 
        isNewestFirst={isNewestFirst} 
        setIsNewestFirst={setIsNewestFirst}
        isFavoritesDisplayed={isFavoritesDisplayed}
        setIsFavoritesDisplayed={setIsFavoritesDisplayed}
        isListView={isListView}
        setIsListView={setIsListView}
        videos={videos}
        setVideos={setVideos} 
        setIsFetchingData={setIsFetchingData}
        setIsDeleteVideosModalOpen={setIsDeleteVideosModalOpen}
      />
      <Videos 
        videosToDisplay={videosToDisplay} 
        handleVideoFavorite={handleVideoFavorite} 
        removeVideo={removeVideo}
        setDisplayVideo={setDisplayVideo}
        isListView={isListView}
      />
      <VideoModal displayVideo={displayVideo} setDisplayVideo={setDisplayVideo} />
      <DeleteVideosModal isDeleteVideosModalOpen={isDeleteVideosModalOpen} setIsDeleteVideosModalOpen={setIsDeleteVideosModalOpen} setVideos={setVideos}/>
    </div>
  );
}

export default App;
