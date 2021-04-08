export type VideoVimeoResponse = {
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

