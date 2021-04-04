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
  viewCount: number,
  likeCount: number,
  dislikeCount: number,
  thumbnail: string,
  addedOn: Date,
  favorite: boolean
};

// const queryClient = new QueryClient();

const App = () => {

  const [videos, setVideos] = useState<Video[] | []>([]);

  const addVideo = (videoToAdd: Video) => {
    setVideos(
      [...videos, videoToAdd]
    );
  }

  console.log(videos);

  return (
    <div className="App">
      <SearchInput videos={videos} setVideos={setVideos}/>
      <Videos videos={videos}/>
    </div>
  );
}

export default App;
