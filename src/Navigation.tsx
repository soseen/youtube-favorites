import './Navigation.scss'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Form} from 'reactstrap'
import { FaYoutube, FaVimeo} from 'react-icons/fa'
import { IoGrid, IoList} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp    } from "react-icons/io";
import { Video } from './App'
import { SearchYoutubeResponse } from './types/SearchYoutubeResponse'
import { VideoYoutubeResponse } from './types/VideoYoutubeResponse'
import { VideoVimeoResponse } from './types/VideoVimeoResponse'
import React, { useState } from 'react';
import { searchYoutube, searchVimeo } from './axios';
import template from './template/template';



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

  

const Navigation: React.FC<Props> = ({isNewestFirst, setIsNewestFirst, isFavoritesDisplayed, setIsFavoritesDisplayed, isListView, setIsListView, setVideos, videos, setIsFetchingData}) => {

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
                    const videoResponse = await searchYoutube.get<VideoYoutubeResponse>('/videos', {
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
                    const videoResponse = await searchVimeo.get<VideoVimeoResponse>(`/videos/${videoId}`)

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
        <div className='navigation-wrapper'>
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
                        {/* <Button color="primary" className='btn btn-primary' onClick = {() => getVideo(videoQuery)}>Search</Button> */}
                    </Form>
                </div>
            </div>
            <div className='search-filters'>
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

export default Navigation;