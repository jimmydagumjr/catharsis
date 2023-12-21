import React from "react"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons from "./../assets/svgs/CustomIcons.jsx"

const MusicPlayer = () => {
    return (
        <div className={MusicPlayerCSS.playerContainer}>
            <div className={MusicPlayerCSS.playerFilter}>
                <CustomAudioPlayer
                    src="https://files.catbox.moe/w5scaz.mp3"
                    layout='stacked-reverse'
                    showSkipControls={true}
                    showJumpControls={false}
                    showFilledVolume={true}
                    showDownloadProgress={false}
                    customAdditionalControls={
                        [
                            <button>
                                s
                            </button>
                        ]
                    }
                    customProgressBarSection={
                        [
                            RHAP_UI.CURRENT_TIME,
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.CURRENT_LEFT_TIME
                        ]
                    }
                    customControlsSection={
                        [
                            RHAP_UI.ADDITIONAL_CONTROLS,
                            RHAP_UI.MAIN_CONTROLS,
                            RHAP_UI.LOOP
                        ]
                    }
                    customIcons={customIcons}
                    autoPlayAfterSrcChange={false}
                    customVolumeControls={[]}
                />
            </div>
        </div>
    )
}

class CustomAudioPlayer extends React.Component {
    render() {
        return (
            <div>
                <AudioPlayer {...this.props} />
                {/* <div>
                    <p>test</p>
                </div> */}
                {/* make container of audioplayer and these items
                into a flexbox? similar to navbar and have song/artist on left,
                and volume on right, use Advanced Usage section on github*/}
            </div>
        )
    }
}



export default MusicPlayer