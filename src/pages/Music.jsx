import MusicCSS from "./../assets/css/Music.module.css"
import { musicData } from "./data/musicData"

const Music = () => {
   return (
      <div className={MusicCSS.playlistBody}>
         <div className={MusicCSS.playlistContainer}>
            <div className={MusicCSS.playlistItem}>
               hello
            </div>
            <div className={MusicCSS.playlistItem}>
               hello
            </div>
            <div className={MusicCSS.playlistItem}>
               hello
            </div>
            <div className={MusicCSS.playlistItem}>
               hello
            </div>
            <div className={MusicCSS.playlistItem}>
               hello
            </div>
         </div>
      </div>
   )
}

export default Music