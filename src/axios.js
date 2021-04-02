import axios from 'axios'

export default  axios.create({
    baseURL: 'https://youtube.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 1,
        // key: process.env.YOUTUBE_API_KEY
        key: 'AIzaSyC-ejC54WuaNvVJn-Bymq-taATjyCURQSU'
    },
    headers: {}
})