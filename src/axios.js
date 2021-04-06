import axios from 'axios'

export const searchYoutube = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3',
    params: {
        maxResults: 1,
        key: process.env.REACT_APP_YOUTUBE_API_KEY
    }
}) 

export const searchVimeo = axios.create({
    baseURL: 'https://api.vimeo.com',
    params: {
        access_token: process.env.REACT_APP_VIMEO_API_KEY
    }
})  