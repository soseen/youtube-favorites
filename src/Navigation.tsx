import './Navigation.scss'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Form, Button} from 'reactstrap'
import { FaYoutube, FaVimeo} from 'react-icons/fa'
import { IoGrid, IoList} from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp, IoIosTrash} from "react-icons/io";
import { Video } from './App'
import { SearchYoutubeResponse } from './types/SearchYoutubeResponse'
import { VideoYoutubeResponse } from './types/VideoYoutubeResponse'
import { VideoVimeoResponse } from './types/VideoVimeoResponse'
import React, { useState } from 'react';
import { searchYoutube, searchVimeo } from './axios';
import template from './template/template';
import { formatISO } from 'date-fns';



type Props = {
    isNewestFirst: boolean,
    setIsNewestFirst: (isNewestFirst: boolean) => void,
    isFavoritesDisplayed: boolean
    setIsFavoritesDisplayed: (isFavoritesDisplayed: boolean) => void,
    isListView: boolean,
    setIsListView: (isListView: boolean) => void,
    videos: Video[],
    setVideos: (newVideos: Video[]) => void,
    setIsFetchingData: (isFetchingData: boolean) => void,
    setIsDeleteVideosModalOpen: (isDeleteVideosModalOpen: boolean) => void
};

  

const Navigation: React.FC<Props> = ({isNewestFirst, setIsNewestFirst, isFavoritesDisplayed, setIsFavoritesDisplayed, isListView, setIsListView, setVideos, videos, setIsFetchingData, setIsDeleteVideosModalOpen}) => {

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

                    let videoToAdd: Video = {
                        id: videoResponse.data.items[0].id,
                        title: videoResponse.data.items[0].snippet.title,
                        description: videoResponse.data.items[0].snippet.description,
                        viewCount: parseInt(videoResponse.data.items[0].statistics.viewCount),
                        likeCount: parseInt(videoResponse.data.items[0].statistics.likeCount),
                        dislikeCount: parseInt(videoResponse.data.items[0].statistics.dislikeCount),
                        thumbnail: videoResponse.data.items[0].snippet.thumbnails.high.url,
                        // addedOn: format(new Date(), 'yyyy-MM-dd'),
                        addedOn: formatISO(new Date(), { representation: 'date' }),
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

            let regExp = /(vimeo.com\/|^)(.*?)(\d{9})($|\/)/;
            let match = videoQuery.match(regExp);

            let videoId = match?.find(value => /^\d{9}/.test(value));

            if(videoId){

                const isDuplicate = videos.find(video => video.id === videoId);

                if(isDuplicate) {
                    setIsFetchingData(false);
                    alert('Video already exists');
                    return
                }

                try {
                    const videoResponse = await searchVimeo.get<VideoVimeoResponse>(`/videos/${videoId}`)

                    let videoToAdd: Video = {
                        id: videoId,
                        title: videoResponse.data.name,
                        description: videoResponse.data.description,
                        likeCount: videoResponse.data.metadata.connections.likes.total,
                        thumbnail: videoResponse.data.pictures.sizes? videoResponse.data.pictures.sizes[3].link : '',
                        addedOn: formatISO(new Date(), { representation: 'date' }),
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

    const loadTemplate = () => {

        let updatedVideos: Video[] = videos;

        template.forEach(templateVideo => {
            if(!updatedVideos.find(video => video.id === templateVideo.id)){
               updatedVideos = [...updatedVideos, templateVideo]
            }
        });

        setVideos(updatedVideos);
    }

    const deleteVideos = () => {
        if(videos && videos.length > 0) {
            setIsDeleteVideosModalOpen(true)
        } else {
            setIsDeleteVideosModalOpen(false)
        }
    }

    return(
        <div className='navigation-wrapper'>
            <div className='search-input-wrapper'>
                <div className='search-input'>
                    <Form inline onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitQuery(e)}>
                        <Dropdown title='source' className='dropdown' isOpen={dropdownOpen.source} toggle={() => setDropdownOpen({...dropdownOpen, source: !dropdownOpen.source})}>
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
                            placeholder="video URL/ID" 
                            value={videoQuery} 
                            onChange={(e: React.FormEvent<HTMLInputElement>) => handleChange(e)}
                        />
                        <Button color="primary" title='search' className='btn btn-primary' onClick = {() => getVideo(videoQuery)}>Search</Button>
                        <Button color="primary" title='load template' className='btn btn-primary' onClick = {()=> loadTemplate()}>Template</Button>
                    </Form>
                </div>
            </div>
            <div className='search-filters'>
                    <button title='delete all' className={videos && videos.length > 0 ? 'delete-videos-btn' : 'delete-videos-btn-inactive'} onClick={()=> deleteVideos()}><IoIosTrash/></button>
                    <button title='display all' className={isFavoritesDisplayed? 'favorites-button' : 'favorites-button button-selected'} onClick={() => setIsFavoritesDisplayed(false)}>All</button>
                    <button title='display favorites only' className={isFavoritesDisplayed? 'favorites-button button-selected' : 'favorites-button'} onClick={() => setIsFavoritesDisplayed(true)}>Favorites</button>
                    {isNewestFirst &&
                            <button title='date desc' className='order-by-button' onClick={()=> setIsNewestFirst(false)}>Order<IoIosArrowDown /></button>
                        }
                        {!isNewestFirst &&
                            <button title='date asc' className='order-by-button' onClick={()=> setIsNewestFirst(true)}>Order<IoIosArrowUp /></button>
                        }
                    <button title='list view' className={isListView? 'view-item view-item-selected' : 'view-item'} onClick={() => setIsListView(true)}>
                        <IoList/>
                    </button>
                    <button title='grid view' className={isListView? 'view-item' : 'view-item view-item-selected'} onClick={() => setIsListView(false)}>
                        <IoGrid/>
                    </button>
            </div>
        </div>

    )
}

export default Navigation;