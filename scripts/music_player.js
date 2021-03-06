import { LyricsPlayer } from './lyrics_player.js'
import { ProgressBar } from './progress_bar.js'
import { songUrl, albumCoverUrl, lyricsUrl } from './helpers.js'

export class MusicPlayer {
    constructor(el) {
        this.$el = el
        this.$el.addEventListener('click', this)
        this.$audio = this.createAudio()
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.player-lyrics'), this.$audio)
        this.progress = new ProgressBar(this.$el.querySelector('.progress'))
        this.fetching = false
    }
    createAudio() {
        let $audio = document.createElement('audio')
        $audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`
        $audio.addEventListener('ended', () => {
            this.$audio.play()
            this.lyrics.restart()
            this.progress.restart()
        })
        document.body.appendChild($audio)
        return $audio
    }
    handleEvent(event) {
        let target = event.target
        switch (true) {
            case target.matches('.icon-play'):
                this.onPlay(event)
                break
            case target.matches('.icon-pause'):
                this.onPause(event)
                break
            case target.matches('.icon-list'):
                this.hide()
                break
        }
    }
    onPlay(event) {
        if (this.fetching) return
        this.$audio.play()
        this.lyrics.start()
        this.progress.start()
        event.target.classList.add('icon-pause')
        event.target.classList.remove('icon-play')
    }
    onPause(event) {
        this.$audio.pause()
        this.lyrics.pause()
        this.progress.pause()
        event.target.classList.add('icon-play')
        event.target.classList.remove('icon-pause')
    }
    play(options = {}) {
        if (!options) return
        this.$el.querySelector('.song-name').innerText = options.songname
        this.$el.querySelector('.song-artist').innerText = options.artist
        this.progress.reset(options.duration)

        fetch(albumCoverUrl(options.albummid, options.singerId))
            .then(res => res.json())
            .then(json => {
                return json.data.albumImgUrl
            })
            .then(url => {
                this.$el.querySelector('.album-cover').src = url
                this.$el.querySelector('.player-background').style.backgroundImage = `url(${url})`
            })
            .catch(() => this.fetching = false)

        if (options.songmid) {
            if (this.songmid !== options.songmid) {
                this.$el.querySelector('.icon-action').className = 'icon-action icon-play'
            }

            this.songmid = options.songmid

            fetch(songUrl(this.songmid))
                .then(res => res.json())
                .then(json => {
                    return json.data[0]
                })
                .then(src => {
                    this.$audio.src = src
                })

            this.fetching = true
            fetch(lyricsUrl(options.lyrics))
                .then(res => res.json())
                .then(json => {
                    return json.data.lyric.replace(/\[换行\]/g, '\n')
                })
                .then(text => {
                    this.lyrics.reset(text)
                })
                .catch(() => { })
                .then(() => this.fetching = false)
        }
        this.show()
    }
    show() {
        this.$el.classList.add('show')
        document.body.classList.add('noscroll')
    }
    hide() {
        this.$el.classList.remove('show')
        document.body.classList.remove('noscroll')
    }
}