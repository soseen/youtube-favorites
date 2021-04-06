import './App.scss';
import { useState } from 'react';
// import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import SearchInput from './SearchInput';
import Videos from './Videos'
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
  source: string
};

// const queryClient = new QueryClient();

const App = () => {

  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = (videoToAdd: Video) => {
    setVideos(
      [...videos, videoToAdd]
    );
  }

  // const handleVideoFavorite = (videoItem: Video) => {

  //   let newVideos: Video[] = videos.map<any>((item) => 
  //     item.id === videoItem.id ? {...item, favorite: !item.favorite} : item
  //   )

  //   let newwVideos: Video[] = videos.map<any>((item) => {
  //     item.id === videoItem.id ? {...item, favorite: !item.favorite} : item
  //   })

  //   setVideos(newwVideos)
  // }

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

  console.log(videos);

  return (
    <div className="App">
      <SearchInput videos={videos} setVideos={setVideos}/>
      <Videos videos={videos} handleVideoFavorite={handleVideoFavorite} removeVideo={removeVideo}/>
    </div>
  );
}

export default App;
