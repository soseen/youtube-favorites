import './App.scss';
import { useState } from 'react';
// import { useQuery, QueryClient, QueryClientProvider } from 'react-query'
import SearchInput from './SearchInput';
import 'bootstrap/dist/css/bootstrap.css';

export type Video = {
  id: number,
  title: string
};

// const queryClient = new QueryClient();

const App = () => {

  const [videos, setVideos] = useState<Video[]>([]);

  const addVideo = (videoToAdd: Video) => {
    setVideos(
      [...videos, videoToAdd]
    );
  }

  return (
    <div className="App">
      <SearchInput addVideo={addVideo}/>
    </div>
  );
}

export default App;
