import './App.scss';
import { useMemo, useState } from 'react';
import { Spinner } from 'reactstrap';
// import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import SearchInput from './SearchInput';
import Videos from './Videos'
import VideoModal from './VideoModal';
import 'bootstrap/dist/css/bootstrap.css';

export type Video = {
  id: string,
  title: string,
  description: string,
  viewCount?: number | undefined,
  likeCount: number,
  dislikeCount?: number | undefined,
  thumbnail: string,
  addedOn: Date,
  favorite: boolean,
  source: string,
  watchURL: string
};

const App = () => {

  const [videos, setVideos] = useState<Video[]>([]);
  const [isFavoritesDisplayed, setIsFavoritesDisplayed] = useState<boolean>(false);
  const [isNewestFirst, setIsNewestFirst] = useState<boolean>(true);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [displayVideo, setDisplayVideo] = useState<{isModalDisplayed: boolean, video?: Video}>({isModalDisplayed: false});

  console.log(new Date('2021-03-15'));

  const videosToDisplay: Video[] = useMemo(()=> {

    console.log(isNewestFirst);
    
    let newVideos: Video[] = videos;

    console.log(newVideos.filter(video => video.favorite))

    if(isFavoritesDisplayed) {
      newVideos = newVideos.filter(video => video.favorite)
    }

    if(isNewestFirst) {
      newVideos.sort((a, b) => b.addedOn.getTime() - a.addedOn.getTime())
    } else {
      newVideos.sort((a, b) => a.addedOn.getTime() - b.addedOn.getTime())
    }

    return newVideos
  },[videos, isFavoritesDisplayed, isNewestFirst])
  // const updateDisplayedVideos = useMemo(() => {
  //   setVideosToDisplay([...videosToDisplay, videos[videos.length - 1]])
  // },[videos]);

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
      <SearchInput 
        isNewestFirst={isNewestFirst} 
        setIsNewestFirst={setIsNewestFirst} 
        setIsFavoritesDisplayed={setIsFavoritesDisplayed} 
        videos={videos} setVideos={setVideos} 
        setIsFetchingData={setIsFetchingData}
      />
      <Videos 
        videosToDisplay={videosToDisplay} 
        handleVideoFavorite={handleVideoFavorite} 
        removeVideo={removeVideo}
        setDisplayVideo={setDisplayVideo}
      />
      <VideoModal displayVideo={displayVideo} setDisplayVideo={setDisplayVideo} />
    </div>
  );
}

export default App;
