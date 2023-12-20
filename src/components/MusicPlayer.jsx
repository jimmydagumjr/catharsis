import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
// import 'react-h5-audio-player/lib/styles.css'
import './../assets/css/AudioPlayer.scss'

const MusicPlayer = () => {
    return (

        <div className={MusicPlayerCSS.playerContainer}>
            <div className={MusicPlayerCSS.playerFilter}>
                <AudioPlayer
                    // className={MusicPlayerCSS.player}
                    src="https://files.catbox.moe/w5scaz.mp3"
                    style={{
                        borderRadius: "1rem",
                        position: "sticky",
                        boxShadow: "none",
                        backgroundColor: "transparent",
                        fontFamily: "Courier"
                    }}
                    // layout='stacked-reverse'
                    showSkipControls={true}
                    showJumpControls={false}
                    showFilledVolume={true}
                    customProgressBarSection={
                        [
                            // RHAP_UI.CURRENT_TIME,

                            RHAP_UI.CURRENT_TIME,
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.CURRENT_LEFT_TIME,
                            RHAP_UI.VOLUME
                        ]
                    }
                    customVolumeControls={[]}
                />
            </div>
        </div>
    )
}

export default MusicPlayer