import './SearchInput.scss'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Form} from 'reactstrap'
import { FaYoutube, FaVimeo} from 'react-icons/fa'
import { IoArrowDown, IoArrowUp, IoGrid, IoList} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp    } from "react-icons/io";
import { Video } from './App'
import React, { useState } from 'react';
import { searchYoutube, searchVimeo } from './axios';
import { useQuery } from 'react-query';
// import templateVideos from './template/templateVideos.json';
import template from './template/template';


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

type videoVimeoResponse = {
    app: {
        name: string,
        uri: string
    },
    created_time: Date,
    description: string,
    duration: number,
    height: number,
    is_playable: boolean,
    language?: string,
    license?: string,
    link: string,
    metadata: {
        connections: {
            comments: {
                uri: string,
                total: number
            },
            credits: {
                uri: string,
                total: number
            },
            likes: {
                uri: string,
                total: number
            },
            pictures: {
                uri: string,
                total: number
            }

        }
    },
    name: string,
    pictures: {
        active: boolean,
        default_picture: boolean,
        resource_key: string,
        sizes: [
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            },
            {
                height: number,
                width: number,
                link: string,
                link_with_play_button: string
            }
        ],
    },
    privacy: {
        add: boolean,
        comments: string,
        download: boolean,
        embed: string,
        view: string
    },
    release_time: Date,
    resource_key: string,
    stats: {
        plays: number | null
    },
    status: string,
    tags: [],
    type: string,
    uri: string,
    width: number
}

type Props = {
    isNewestFirst: boolean,
    setIsNewestFirst: (isNewestFirst: boolean) => void,
    isFavoritesDisplayed: boolean
    setIsFavoritesDisplayed: (isFavoritesDisplayed: boolean) => void,
    isListView: boolean,
    setIsListView: (isListView: boolean) => void,
    videos: Video[],
    setVideos: (newVideos: Video[]) => void,
    setIsFetchingData: (isFetchingData: boolean) => void
};

  

const SearchInput: React.FC<Props> = ({isNewestFirst, setIsNewestFirst, isFavoritesDisplayed, setIsFavoritesDisplayed, isListView, setIsListView, setVideos, videos, setIsFetchingData}) => {

    const [videoQuery, setVideoQuery] = useState<string>('');
    const [dropdownOpen, setDropdownOpen] = useState<{source: boolean, favoritesFilter: boolean}>({source: false, favoritesFilter: false});
    const [selectedSource, setSelectedSource] = useState<string>('youtube');

    const submitQuery = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getVideo(videoQuery);
    }

    const getVideo = async (videoQuery: string): Promise<void> => {

        setIsFetchingData(true);

        if(selectedSource === 'youtube') {
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

            if(isDuplicate) {
                setIsFetchingData(false);
                alert('Video already exists');
                return
            }

            if (videoId) {
                try {
                    const videoResponse = await searchYoutube.get<videoYoutubeResponse>('/videos', {
                        params: {
                            id: videoId,
                            part: 'statistics, snippet, contentDetails',
                        }       
                    })
                    console.log(videoResponse.data);

                    let videoToAdd: Video = {
                        id: videoResponse.data.items[0].id,
                        title: videoResponse.data.items[0].snippet.title,
                        description: videoResponse.data.items[0].snippet.description,
                        viewCount: parseInt(videoResponse.data.items[0].statistics.viewCount),
                        likeCount: parseInt(videoResponse.data.items[0].statistics.likeCount),
                        dislikeCount: parseInt(videoResponse.data.items[0].statistics.dislikeCount),
                        thumbnail: videoResponse.data.items[0].snippet.thumbnails.high.url,
                        addedOn: new Date(),
                        favorite: false,
                        source: 'youtube',
                        watchURL: `https://www.youtube.com/watch?v=${videoResponse.data.items[0].id}`
                    }
                    setVideos([...videos, videoToAdd]);
                } catch (error) {
                    console.log(error);
                    alert('Video not found');
                }    
            } else {
                alert('Video not found');
            }
        } else if (selectedSource === 'vimeo') {

            let regExp = /(vimeo.com\/|^)(\d+)($|\/)/;
            let match = videoQuery.match(regExp);

            if(match){

                let videoId = match[2];

                const isDuplicate = videos.find(video => video.id === videoId);

                if(isDuplicate) {
                    setIsFetchingData(false);
                    alert('Video already exists');
                    return
                }

                try {
                    const videoResponse = await searchVimeo.get<videoVimeoResponse>(`/videos/${videoId}`)

                    console.log(videoResponse.data);

                    let videoToAdd: Video = {
                        id: videoId,
                        title: videoResponse.data.name,
                        description: videoResponse.data.description,
                        likeCount: videoResponse.data.metadata.connections.likes.total,
                        thumbnail: videoResponse.data.pictures.sizes? videoResponse.data.pictures.sizes[3].link : '',
                        addedOn: new Date(),
                        favorite: false,
                        source: 'vimeo',
                        watchURL: `https://vimeo.com/${videoId}`
                    }
                    setVideos([...videos, videoToAdd]);
                } catch (error) {
                    console.log(error);
                    alert('Video not found');
                }
                
            } else {
                alert('Video not found');
            }
        }
        setIsFetchingData(false);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setVideoQuery((e.target as HTMLInputElement).value)
    }

    return(
        <div className='navigation'>
            <div className='search-input-wrapper'>
                <div className='search-input'>
                    <Form inline onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitQuery(e)}>
                        <Dropdown className='dropdown' isOpen={dropdownOpen.source} toggle={() => setDropdownOpen({...dropdownOpen, source: !dropdownOpen.source})}>
                            <DropdownToggle className='bg-primary'>
                            {selectedSource === 'youtube' &&
                                <FaYoutube />
                            }
                            {selectedSource === 'vimeo' &&
                                <FaVimeo />
                            } 
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Source</DropdownItem>
                                <DropdownItem onClick={() => setSelectedSource('youtube')}>Youtube</DropdownItem>
                                <DropdownItem onClick={() => setSelectedSource('vimeo')}>Vimeo</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Input 
                            type="text" 
                            name="video-input" 
                            className="input mr-10"
                            placeholder="video URL" 
                            value={videoQuery} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
                        />             
                        <Button color="primary" className='btn btn-primary' onClick = {() => getVideo(videoQuery)}>Search</Button>
                    </Form>
                </div>
            </div>
            <div className='search-filters'>
                    {/* <Dropdown className='dropdown' isOpen={dropdownOpen.favoritesFilter} toggle={() => setDropdownOpen({...dropdownOpen, favoritesFilter: !dropdownOpen.favoritesFilter})}>
                        <DropdownToggle caret className='bg-primary'>
                            Display
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Display</DropdownItem>
                            <DropdownItem onClick={() => setIsFavoritesDisplayed(false)}>All</DropdownItem>
                            <DropdownItem onClick={() => setIsFavoritesDisplayed(true)}>Favorites</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" className='btn btn-primary' onClick = {() => setVideos(template)}>Load Template</Button>
                    {isNewestFirst? 
                    <Button color="primary" className='btn btn-primary' onClick = {() => setIsNewestFirst(false)}>Oldest</Button>
                    :
                    <Button color="primary" className='btn btn-primary' onClick = {() => setIsNewestFirst(true)}>Newest</Button>
                    } */}
                    <button className='load-template-button' onClick = {() => setVideos(template)}>Load Template</button>
                    <button className={isFavoritesDisplayed? 'favorites-button' : 'favorites-button button-selected'} onClick={() => setIsFavoritesDisplayed(false)}>All</button>
                    <button className={isFavoritesDisplayed? 'favorites-button button-selected' : 'favorites-button'} onClick={() => setIsFavoritesDisplayed(true)}>Favorites</button>
                    {isNewestFirst &&
                            <button className='order-by-button' onClick={()=> setIsNewestFirst(false)}>Order<IoIosArrowDown /></button>
                        }
                        {!isNewestFirst &&
                            <button className='order-by-button' onClick={()=> setIsNewestFirst(true)}>Order<IoIosArrowUp /></button>
                        }
                    <div className={isListView? 'view-item view-item-selected' : 'view-item'} onClick={() => setIsListView(true)}>
                        <IoList/>
                    </div>
                    <div className={isListView? 'view-item' : 'view-item view-item-selected'} onClick={() => setIsListView(false)}>
                        <IoGrid/>
                    </div>
            </div>
        </div>

    )
}

export default SearchInput;