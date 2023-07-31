

export interface IUser {
    login: string
    id: number
    avatar_url: string
    url: string
    site_admin: boolean
    subscriptions_url: string
    followers_url: string
    following_url: string
}

export type viewOrderType =  'desc' | 'asc'

export interface IUserIniStateType {
    users: {
        items: IUser[]
        loadingStatus: 'loaded' | 'loading' | 'error'
        totalUsersCount: number
    }
    viewOrder: viewOrderType
    query: string
    page: number
    maxVisiblePage: number
    popup: {
        id: string | undefined
        opened: boolean
    }
}

export interface IFetch {
    order?: viewOrderType
    query?: string
    page?: number
}


export interface IUserData {
    name: string
    location: string
    created_at: string
    public_repos: number
}
