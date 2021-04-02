import axios from 'axios'

export const searchYoutube = axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: process.env.REACT_APP_YOUTUBE_API_KEY
    },
    headers: {}
})  