import { useDispatch, useSelector } from "react-redux";
import MusicCSS from "./../assets/css/Music.module.css";
import { musicData } from "./data/musicData";
import { setCurrentTrack } from "../redux/musicPlayerSlice";
import { motion } from "framer-motion";

const Music = () => {
  return (
    <div className={MusicCSS.playlistBody}>
      <div className={MusicCSS.playlistContainer}>
        <PlaylistItemMap />
      </div>
    </div>
  );
};

const PlaylistItemMap = () => {
  return musicData.map((song, index) => {
    return <PlaylistItem key={song.src} song={song} index={index} />;
  });
};

const playlistVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const PlaylistItem = ({ song, index }) => {
  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(setCurrentTrack(index));
  };

  const handleOpenUrl = (e) => {
    if (song.url) {
      window.open(song.url, "_blank");
    }
    e.stopPropagation();
  };

  const currentTrack = useSelector((state) => state.musicPlayer.currentTrack);

  const detailsContainerClassName =
    currentTrack === index
      ? `${MusicCSS.detailsContainer} ${MusicCSS.active}`
      : MusicCSS.detailsContainer;

  return (
    <motion.div
      className={MusicCSS.playlistItem}
      onClick={handleItemClick}
      // whileTap = {{ x: 10, transition: { duration: 0.01 } }}
      variants={playlistVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.3,
      }}
    >
      <div className={MusicCSS.imageContainer}>
        <img className={MusicCSS.image} src={song.img_src} loading="lazy" />
      </div>
      <div className={detailsContainerClassName}>
        <div className={MusicCSS.infoContainer}>
          <div className={MusicCSS.titleContainer}>
            <h2 className={MusicCSS.title}>{song.title}</h2>
          </div>
          <div className={MusicCSS.artistContainer}>
            <p className={MusicCSS.artist}>{song.artist}</p>
          </div>
        </div>
        <div className={MusicCSS.spotify}>
          {song.url && (
            <button className={MusicCSS.urlButton} onClick={handleOpenUrl}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
              >
                <path d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0Zm89.668 347.523a13.139 13.139 0 0 1-18.24 3.551c-70.978-47.847-178.969-19.9-180.052-19.608a13.14 13.14 0 1 1-6.755-25.4c1.224-.325 30.427-7.987 69.6-9.132 52.611-1.539 98.222 9.645 131.9 32.345a13.141 13.141 0 0 1 3.547 18.244Zm25.272-56.7a15.955 15.955 0 0 1-21.982 5.094c-47.7-29.75-100.787-34.875-136.923-33.933-39.908 1.041-68.691 9.485-68.978 9.571a15.955 15.955 0 0 1-9.168-30.565c1.3-.391 32.392-9.6 76.295-10.876 58.494-1.7 112.321 11.694 155.662 38.728a15.955 15.955 0 0 1 5.094 21.985Zm29.435-66.123a19.237 19.237 0 0 1-26.05 7.853c-58.761-31.54-120.637-36.549-162.195-35.2-45.744 1.488-77.785 10.784-78.1 10.877a19.239 19.239 0 0 1-10.95-36.888c1.454-.433 36.185-10.618 86.542-12.4 66.839-2.372 130.086 11.358 182.9 39.709a19.239 19.239 0 0 1 7.853 26.049Z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Music;
