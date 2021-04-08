// import { Video } from '../App'

// const template: Video[] = [
//     {
//         addedOn: "2021-04-01",
//         description: "Rick Astley's official music video for “Never Gonna Give You Up” ↵Listen to Rick Astley: https:// Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD",
//         dislikeCount: 271864,
//         favorite: true,
//         id: "dQw4w9WgXcQ",
//         likeCount: 9162802,
//         source: "youtube",
//         thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
//         title: "Rick Astley - Never Gonna Give You Up (Video)",
//         viewCount: 913917543
//     },
//     {
//         addedOn: "2021-03-16",
//         description: "Relive Chelsea's dramatic penalty shootout triumph over Bayern in the 2012 UEFA Champions League final in Munich. \n http://www.youtube.com/subscription_center?add_user=uefa",
//         dislikeCount: 1016,
//         favorite: true,
//         id: "eOMqaQFFhk0",
//         likeCount: 45523,
//         source: "youtube",
//         thumbnail: "https://i.ytimg.com/vi/eOMqaQFFhk0/hqdefault.jpg",
//         title: "BAYERN 1-1p CHELSEA: #UCL 2012 FINAL FLASHBACK",
//         viewCount: 2424260
//     },
//     {
//         addedOn: "2021-03-28",
//         description: "Patagonia Films presents: Treeline. Follow a group of skiers, snowboarders, scientists and healers to the birch forests of Japan, the red cedars of British Columbia and the bristlecones of Nevada, as they explore an ancient story written in rings./nDirected by Jordan Manley/nProducers: Laura Yale, Monika McClure",
//         favorite: false,
//         id: "492663943",
//         likeCount: 1000,
//         source: "vimeo",
//         thumbnail: "https://i.vimeocdn.com/video/1018716640_640x360.jpg?r=pad",
//         title: "Treeline"
//     },
//     {
//         addedOn: "2021-03-20",
//         description: "Music video by Krzysztof Krawczyk & Goran Bregovic performing Moj przyjacielu. (C) 2001 BMG Music Poland",
//         dislikeCount: 1809,
//         favorite: false,
//         id: "g0kgw2kkFnM",
//         likeCount: 56980,
//         source: "youtube",
//         thumbnail: "https://i.ytimg.com/vi/g0kgw2kkFnM/hqdefault.jpg",
//         title: "Krzysztof Krawczyk & Goran Bregovic - Moj przyjacielu [Official Music Video]",
//         viewCount: 10542704
//     },
//     {
//         addedOn: "2021-03-29",
//         description: "Here's our top upcoming movies coming 2021 with newly released trailers /n00:00 Mortal Kombat/n02:30 Justice League: The Snyder Cut/n04:45 Cruella/n06:17 Godzilla vs Kong/n07:17 Son/n09:09 Cosmic Sin/n11:30 The Devil Below/n13:23 Phobias/n15:18 Willy's Wonderland/n17:07 Ascendant/n18:58 Gaia",
//         dislikeCount: 739,
//         favorite: false,
//         id: "yqOHp8h-Emw",
//         likeCount: 18253,
//         source: "youtube",
//         thumbnail: "https://i.ytimg.com/vi/yqOHp8h-Emw/hqdefault.jpg",
//         title: "TOP UPCOMING MOVIES 2021 (New Trailers)",
//         viewCount: 2185109
//     },
//     {
//         addedOn: "2021-02-17",
//         description: "AirMapp & Serial Kombi present 'RESURRECTION', a short movie about the found and the rescue of my 1955 panelvan. It was abandonned deep in a french alps valley since at least 40 years and we pulled it out of the forest in september 2016 by 'restoring' it on site and driving it down the mountain ! /nHope you will enjoy this video./nMusic list at the end of the movie./nFilmed with 5D mark II, GoPro Hero4 black edition and a 3DR solo drone.",
//         favorite: true,
//         id: "187165137",
//         likeCount: 1427,
//         source: "vimeo",
//         thumbnail: "https://i.vimeocdn.com/video/596826440_640x360.jpg?r=pad",
//         title: "RESURRECTION - Rescue of a VW 1955 panelvan - Forest find !"
//     },
//     {
//         addedOn: "2021-03-20",
//         description: "Lilith, The daughter of Lord of Hatred, returns to Sanctuary in the reveal trailer for Diablo 4. Diablo IV is the newest cinematic from Blizzcon 2019",
//         dislikeCount: 7312,
//         favorite: false,
//         id: "0SSYzl9fXOQ",
//         likeCount: 150100,
//         source: "youtube",
//         thumbnail: "https://i.ytimg.com/vi/0SSYzl9fXOQ/hqdefault.jpg",
//         title: "Diablo 4 - Official Announcement Cinematic Trailer | Blizzcon 2019",
//         viewCount: 9338893
//     }
// ]

// export default template;

import { Video } from '../App'

const template: Video[] = [
    {
        addedOn: new Date('2021-04-01'),
        description: "Rick Astley's official music video for “Never Gonna Give You Up” ↵Listen to Rick Astley: https:// Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYD",
        dislikeCount: 271864,
        favorite: true,
        id: "dQw4w9WgXcQ",
        likeCount: 9162802,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        title: "Rick Astley - Never Gonna Give You Up (Video)",
        viewCount: 913917543,
        watchURL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
        addedOn: new Date('2021-04-06'),
        description: "Game of Thrones meets True Detective",
        dislikeCount: 388,
        favorite: true,
        id: "AR9PIUpPE6U",
        likeCount: 72049,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/AR9PIUpPE6U/hqdefault.jpg",
        title: "Game of Thrones Intro (True Detective Style)",
        viewCount: 838724,
        watchURL: "https://www.youtube.com/watch?v=AR9PIUpPE6U"
    },
    {
        addedOn: new Date('2021-02-17'),
        description: "Relive Chelsea's dramatic penalty shootout triumph over Bayern in the 2012 UEFA Champions League final in Munich. \n http://www.youtube.com/subscription_center?add_user=uefa",
        dislikeCount: 1016,
        favorite: true,
        id: "eOMqaQFFhk0",
        likeCount: 45523,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/eOMqaQFFhk0/hqdefault.jpg",
        title: "BAYERN 1-1p CHELSEA: #UCL 2012 FINAL FLASHBACK",
        viewCount: 2424260,
        watchURL: 'https://www.youtube.com/watch?v=eOMqaQFFhk0'
    },
    {
        addedOn: new Date('2021-03-16'),
        description: "Patagonia Films presents: Treeline. Follow a group of skiers, snowboarders, scientists and healers to the birch forests of Japan, the red cedars of British Columbia and the bristlecones of Nevada, as they explore an ancient story written in rings./nDirected by Jordan Manley/nProducers: Laura Yale, Monika McClure",
        favorite: false,
        id: "492663943",
        likeCount: 1000,
        source: "vimeo",
        thumbnail: "https://i.vimeocdn.com/video/1018716640_640x360.jpg?r=pad",
        title: "Treeline",
        watchURL: "https://vimeo.com/492663943"
    },
    {
        addedOn: new Date('2021-03-21'),
        description: "Music video by Krzysztof Krawczyk & Goran Bregovic performing Moj przyjacielu. (C) 2001 BMG Music Poland",
        dislikeCount: 1809,
        favorite: false,
        id: "g0kgw2kkFnM",
        likeCount: 56980,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/g0kgw2kkFnM/hqdefault.jpg",
        title: "Krzysztof Krawczyk & Goran Bregovic - Moj przyjacielu [Official Music Video]",
        viewCount: 10542704,
        watchURL: 'https://www.youtube.com/watch?v=g0kgw2kkFnM'
    },
    {
        addedOn: new Date('2021-03-29'),
        description: "Here's our top upcoming movies coming 2021 with newly released trailers /n00:00 Mortal Kombat/n02:30 Justice League: The Snyder Cut/n04:45 Cruella/n06:17 Godzilla vs Kong/n07:17 Son/n09:09 Cosmic Sin/n11:30 The Devil Below/n13:23 Phobias/n15:18 Willy's Wonderland/n17:07 Ascendant/n18:58 Gaia",
        dislikeCount: 739,
        favorite: false,
        id: "yqOHp8h-Emw",
        likeCount: 18253,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/yqOHp8h-Emw/hqdefault.jpg",
        title: "TOP UPCOMING MOVIES 2021 (New Trailers)",
        viewCount: 2185109,
        watchURL: 'https://www.youtube.com/watch?v=yqOHp8h-Emw'
    },
    {
        addedOn: new Date('2021-03-28'),
        description: "AirMapp & Serial Kombi present 'RESURRECTION', a short movie about the found and the rescue of my 1955 panelvan. It was abandonned deep in a french alps valley since at least 40 years and we pulled it out of the forest in september 2016 by 'restoring' it on site and driving it down the mountain ! /nHope you will enjoy this video./nMusic list at the end of the movie./nFilmed with 5D mark II, GoPro Hero4 black edition and a 3DR solo drone.",
        favorite: true,
        id: "187165137",
        likeCount: 1427,
        source: "vimeo",
        thumbnail: "https://i.vimeocdn.com/video/596826440_640x360.jpg?r=pad",
        title: "RESURRECTION - Rescue of a VW 1955 panelvan - Forest find !",
        watchURL: "https://vimeo.com/187165137"
    },
    {
        addedOn: new Date('2021-03-20'),
        description: "Lilith, The daughter of Lord of Hatred, returns to Sanctuary in the reveal trailer for Diablo 4. Diablo IV is the newest cinematic from Blizzcon 2019",
        dislikeCount: 7312,
        favorite: false,
        id: "0SSYzl9fXOQ",
        likeCount: 150100,
        source: "youtube",
        thumbnail: "https://i.ytimg.com/vi/0SSYzl9fXOQ/hqdefault.jpg",
        title: "Diablo 4 - Official Announcement Cinematic Trailer | Blizzcon 2019",
        viewCount: 9338893,
        watchURL: 'https://www.youtube.com/watch?v=0SSYzl9fXOQ'
    }
]

export default template;