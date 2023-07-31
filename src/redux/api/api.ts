import axios from 'axios';

export const API_URL = 'https://api.github.com/search/'

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }
})


export default instance;