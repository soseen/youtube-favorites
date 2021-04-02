import './SearchInput.scss'
import { Button, Input} from 'reactstrap'
import { Video } from './App'
import { useState } from 'react';
import { searchYoutube } from './axios';
import { useQuery } from 'react-query';


type SearchYoutubeResponse = {
    etag: string,
    items: {
        kind: string,
        id: {
            videoId: string
        }
    } [],
    kind: string,
    snippet: {
        channelId: string,
        channelTitle: string,
        description: string,
        liveBroadcastContent: string,
        publishTime: string,
        publishedAt: string,
        thumbnails: {
            default: {
                height: number,
                url: string,
                width: number
            },
            high: {
                height: number,
                url: string,
                width: number
            },
            medium: {
                height: number,
                url: string,
                width: number
            }
        }
    }
};

type Props = {
    addVideo: (videoToAdd: Video) => void
};

  

const SearchInput: React.FC<Props> = ({addVideo}) => {

    const [videoQuery, setVideoQuery] = useState<string>('');

    const getVideo = async (videoQuery: string): Promise<void> => {

        const IdResponse = await searchYoutube.get<SearchYoutubeResponse>('/search', {
            params: {
                q: videoQuery
            }       
        })

        console.log(IdResponse.data.items[0].id.videoId);

    }

    // const { data, isLoading, error } = useQuery<Video>(
    //     ['products', {videoQuery: videoQuery}],
    //     getVideo
    //   )

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setVideoQuery((e.target as HTMLInputElement).value)
    }

    return(
        <div className='search-input-wrapper'>
                        <Input 
                            type="email" 
                            name="email" 
                            className="input mr-10" 
                            placeholder="video URL" 
                            value={videoQuery} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
                        />             
                        <Button color="primary" onClick = {() => getVideo(videoQuery)}>Search</Button>
        </div>

    )
}

export default SearchInput;