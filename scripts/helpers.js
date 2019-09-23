import { LYRICS_URL, SEARCH_URL } from './constants.js'

export function lyricsUrl(id){
    return `${LYRICS_URL}/${id}`
}

export function albumCoverUrl(albummid, singerMid){
    return `https://music.niubishanshan.top/api/v2/music/albumImg/${albummid}/${singerMid}`
}

export function songUrl(id) {
    return `https://music.niubishanshan.top/api/v2/music/songUrllist/${id}`}

export function searchUrl(keyword, page = 1) {
    return `${SEARCH_URL}/:${keyword}/:page?${page}/:perPage?20`
}