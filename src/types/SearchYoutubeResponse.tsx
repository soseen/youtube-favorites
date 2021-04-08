export type SearchYoutubeResponse = {
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

