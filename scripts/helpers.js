import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function lyricsUrl(id){
    return `${LYRICS_URL}?id=${id}`
}

export function albumCoverUrl(id){
    return `https://v1.itooi.cn/tencent/pic?id=${id}`
}

export function songUrl(id) {
    return `https://v1.itooi.cn/tencent/url?id=${id}&quality=flac`
}

export function searchUrl(keyword, page = 1) {
    return `${SEARCH_URL}?keyword=${keyword}&type=song&pageSize=20&page=${page}`
}