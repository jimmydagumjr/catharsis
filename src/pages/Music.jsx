import { useDispatch, useSelector } from "react-redux"
import MusicCSS from "./../assets/css/Music.module.css"
import { musicData } from "./data/musicData"
import { setCurrentTrack } from "../redux/musicPlayerSlice"

const Music = () => {
   return (
      <div className={MusicCSS.playlistBody}>
         <div className={MusicCSS.playlistContainer}>
            <PlaylistItemMap />
         </div>
      </div>
   )
}

const PlaylistItemMap = () => {
   return musicData.map((song, index) => {
      return <PlaylistItem
         key={song.src}
         song={song}
         index={index}
      />
   })
}

const PlaylistItem = ({ song, index }) => {
   const dispatch = useDispatch();

   const handleItemClick = () => {
      dispatch(setCurrentTrack(index));
   }

   const currentTrack = useSelector(state => state.musicPlayer.currentTrack);

   const detailsContainerClassName = currentTrack === index
      ? `${MusicCSS.detailsContainer} ${MusicCSS.active}`
      : MusicCSS.detailsContainer;

   return (
      <div className={MusicCSS.playlistItem} onClick={handleItemClick}>
         <div className={MusicCSS.imageContainer}>
            <img
               className={MusicCSS.image}
               src={song.img_src}
               loading="lazy"
            />
         </div>
         <div className={detailsContainerClassName}>
            <h2 className={MusicCSS.title}>
               {song.title}
            </h2>
            <p className={MusicCSS.artist}>
               {song.artist}
            </p>
         </div>
      </div>
   )
}

export default Music