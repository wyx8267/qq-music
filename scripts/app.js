import './tab.js'
import { Recommend } from './recommend.js'
import { Search } from './search.js'
import { MusicPlayer } from './music_player.js'
import { TopList } from './toplist.js'

let recommend = new Recommend(document.querySelector('.rec-view')).launch()
let toplist = new TopList(document.querySelector('.rank-view')).launch()
let search = new Search(document.querySelector('.search-view'))
let player = new MusicPlayer(document.querySelector('#player'))

document.querySelector('.show-player').addEventListener('click', () => {
    player.show()
})

onHashChange()
addEventListener('hashchange', onHashChange)

function onHashChange() {
    let hash = location.hash
    if (/^#player\?.+/.test(hash)) {
        let matches = hash.slice(hash.indexOf('?') + 1).match(/(\w+)=([^&]+)/g)
        let options = matches && matches.reduce((res, cur) => {
            let arr = cur.split('=')
            res[arr[0]] = decodeURIComponent(arr[1])
            return res
        }, {})
        player.play(options)
    } else {
        player.hide()
    }
}
