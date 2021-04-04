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

type videoYoutubeResponse = {
    etag: string,
    items: {
        etag: string,
        id: string,
        kind: string,
        snippet: {
            categoryId: string,
            channelId: string,
            channelTitle: string,
            defaultAudioLanguage: string,
            defaultLanguage: string,
            description: string,
            liveBroadcastContent: string,
            localized: {
                description: string,
                title: string
            },
            publishedAt: Date,
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
                maxres: {
                    height: number,
                    url: string,
                    width: number
                },
                medium: {
                    height: number,
                    url: string,
                    width: number
                },
                standard: {
                    height: number,
                    url: string,
                    width: number
                }
            },
            title: string
        },
        statistics: {
            commentCount: string,
            dislikeCount: string,
            favoriteCount: string,
            likeCount: string,
            viewCount: string
        }
    } []
}

type Props = {
    setVideos: (videoToAdd: Video[]) => void,
    videos: Video[]
};

  

const SearchInput: React.FC<Props> = ({setVideos, videos}) => {

    const [videoQuery, setVideoQuery] = useState<string>('');

    const getVideo = async (videoQuery: string): Promise<void> => {

        let videoId: string | null = null;

        try {
            const searchResponse = await searchYoutube.get<SearchYoutubeResponse>('/search', {
                params: {
                    part: 'snippet',
                    q: videoQuery
                }       
            })

           videoId = searchResponse.data.items[0].id.videoId;

        } catch (error) {
            console.log(error)
        }

        const isDuplicate = videos.find(video => video.id === videoId);

        console.log(isDuplicate)

        if (videoId && !isDuplicate) {
            try {
                const videoResponse = await searchYoutube.get<videoYoutubeResponse>('/videos', {
                    params: {
                        id: videoId,
                        part: 'statistics, snippet, contentDetails',
                    }       
                })
                console.log(videoResponse.data);
                setVideos([...videos, {
                    id: videoResponse.data.items[0].id,
                    title: videoResponse.data.items[0].snippet.title,
                    description: videoResponse.data.items[0].snippet.description,
                    viewCount: parseInt(videoResponse.data.items[0].statistics.viewCount),
                    likeCount: parseInt(videoResponse.data.items[0].statistics.likeCount),
                    dislikeCount: parseInt(videoResponse.data.items[0].statistics.dislikeCount),
                    thumbnail: videoResponse.data.items[0].snippet.thumbnails.medium.url,
                    addedOn: new Date(),
                    favorite: false
                }]
                )
            } catch (error) {
                console.log(error)
            }    
        } else {
            alert('Video not found');
        }
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
            <div className='search-input'>
                <Input 
                    type="email" 
                    name="email" 
                    className="input mr-10" 
                    placeholder="video URL" 
                    value={videoQuery} 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
                />             
                <Button color="primary" className='btn btn-primary' onClick = {() => getVideo(videoQuery)}>Search</Button>
            </div>       
        </div>

    )
}

export default SearchInput;