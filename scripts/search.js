import { searchUrl } from './helpers.js'

export class Search {
    constructor(el) {
        this.$el = el
        this.$input = this.$el.querySelector('#search')
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this))
        this.$songs = this.$el.querySelector('.song-list')
        this.keyword = ''
        this.page = 1
        this.songs = []
        this.perpage = 20
        this.nomore = false
        this.fetching = false
        this.onscroll = this.onScroll.bind(this)
        window.addEventListener('scroll', this.onscroll)
    }

    onKeyUp(event) {
        let keyword = event.target.value.trim()
        if (!keyword) return this.reset()
        if (event.keyCode !== 13) return
        this.search(keyword)
    }

    onScroll() {
        if (this.nomore) return
        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 50) {
            this.search(this.keyword, this.page + 1)
        }
    }

    reset() {
        this.page = 1
        this.keyword = ''
        this.songs = []
        this.$songs.innerHTML = ''
    }

    search(keyword, page) {
        if (this.keyword === keyword && this.songs[page || this.page]) return
        if (this.nomore || this.fetching) return
        if (this.keyword !== keyword) this.reset()
        this.keyword = keyword
        this.loading()
        fetch(searchUrl(this.keyword, page || this.page))
            .then(res => res.json())
            .then(json => {
                this.page = json.data.page.currentPage
                this.songs[this.page] = json.data.songList
                this.nomore = json.message === 'no results'
                return json.data.songList
            })
            .then(songs => this.append(songs))
            .then(() => this.done())
            .catch(() => this.fetching = false)
    }

    append(songs) {
        let html = songs.map(song => {
            // let artist = song.singer.map(s => s.name).join(' ')
            return `
            <a class="song-item" href="#player?songmid=${song.songMid}&artist=${song.singer[0].singerName}&songname=${song.songName}&albummid=${song.albumMid}&lyrics=${song.songId}&singerId=${song.singer[0].singerMid}">
                <i class="icon icon-music"></i>
                <div class="song-name ellipsis">${song.songName}</div>
                <div class="song-artist ellipsis">${song.singer[0].singerName}</div>
            </a>`}).join('')
        this.$songs.insertAdjacentHTML('beforeend', html)
    }

    loading() {
        this.fetching = true
        this.$el.querySelector('.search-loading').classList.add('show')
    }

    done() {
        this.fetching = false
        if (this.nomore) {
            this.$el.querySelector('.loading-icon').style.display = 'none'
            this.$el.querySelector('.loading-text').style.display = 'none'
            this.$el.querySelector('.loading-done').style.display = 'block'
            this.$el.querySelector('.search-loading').classList.add('show')
        } else {
            this.$el.querySelector('.search-loading').classList.remove('show')
        }
    }
}